/*global device*/
import React, { Component } from 'react';

import Front from './Front'
import Sub from './Sub'
import Room from './util/Room';
import GAUtil from './util/GAUtil';
import Wrapper from './components/templates/WrapperTemplate';
import SimpleTemplate from './components/templates/SimpleTemplate';
import KaratetsuGoComplete from './components/pages/KaratetsuGoComplete';
/* Network Error */
// import NetworkErrorPage from './components/pages/NetworkError';

import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        let localStorage = window.localStorage;

        this.state = {
            serial: (typeof device !== 'undefined') ? device.serial : '000000000',
            shop_id: localStorage.getItem('shop_id'),
            shop_name: localStorage.getItem('shop_name'),
            room_num: localStorage.getItem('room_num'),
            room_name: localStorage.getItem('room_name'),
            page_name: null
        }

        // debug mode
        if (localStorage.getItem('debug_mode') === 'true') {
            this.state.debug_mode = true;
        } else if (localStorage.getItem('debug_mode') === 'false') {
            this.state.debug_mode = false;
        }

        // full screen mode
        if (localStorage.getItem('full_screen_mode') === 'true') {
            this.state.full_screen_mode = true;
        } else if (localStorage.getItem('full_screen_mode') === 'false') {
            this.state.full_screen_mode = false;
        }

        if (typeof this.state.shop_id !== 'undefined' && typeof this.state.room_num !== 'undefined' ) {
            Room.getRoomInfo(this.state.shop_id, this.state.room_num, callback.bind(this))
        }

        window.sessionStorage.clear();
        // Page Name（リロード時に画面を保持したくない場合は消しちゃうのもありかも）
        // let pageName = window.sessionStorage.getItem('page_name');
        // this.state.page_name = pageName;

        function callback(roomInfo) {
            this.setState({ room_info: roomInfo });
        }

        GAUtil.initialize();

        this.REFRESH_TIME = 1 * 60 * 1000;
        this.isRefresh = false;

        this.refreshWindow = this.refreshWindow.bind(this);
        this.setRefreshTask = this.setRefreshTask.bind(this);

        // 動作がなければリフレッシュ
        if (!this.state.debug_mode) {
            document.addEventListener('touchstart', this.setRefreshTask, false);
            document.addEventListener('touchmove', this.setRefreshTask, false);
            document.addEventListener('touchend', this.setRefreshTask, false);
        }
    }

    componentDidMount() {
        // serial number
        let _log = (typeof device !== 'undefined') ? 'serialNumber=' + device.serial : '';

        // app vertion
        if (typeof window.cordova !== 'undefined') {
            window.cordova.getAppVersion.getVersionNumber((version) => {
                this.setState({ version: version });

                if (typeof version !== 'undefined') _log += '&version=' + version;
            });
        }

        // shop id
        if (typeof this.state.shop_id !== 'undefined' && this.shop_id !== null) {
            if (this.state.debug_mode) {
                _log += '&shop_id=9999';
            } else {
                _log += '&shop_id=' + this.state.shop_id;
            }
        }

        // room name
        if (typeof this.state.room_name !== 'undefined' && this.room_name !== null) {
            _log += '&room_name=' + this.state.room_name;
        }

        // 定期ログ出力のタスクをセット
        if (0 < _log.length) {
            this.deviceLog = setInterval(() => {
                console.log('KaratezRoomNaviLog:' + _log);
            }, 5000);
        }
    }

    componentWillUnmount() {
        clearTimeout(this.watchOperation);
        clearInterval(this.deviceLog);
    }

    refreshWindow () {
        if (this.isRefresh) {
            GAUtil.event('window', 'reload', 'refresh', 1);
            window.location.reload();
        } else {
            clearTimeout(this.watchOperation);
        }
    }

    setRefreshTask () {
        this.isRefresh = true;
        clearTimeout(this.watchOperation);
        this.watchOperation = setTimeout(this.refreshWindow, this.REFRESH_TIME);
    }

    // ページ名をセット
    setPageName = () => (page_name) => {
        this.setState({page_name: page_name});
    }

    // TOPページに移動
    goFront = () => () => {
        // window.location.reload();

        window.sessionStorage.clear();
        Room.getRoomInfo(this.state.shop_id, this.state.room_num, callback.bind(this));

        function callback(roomInfo) {
            this.setState({
                page_name: null,
                room_info: roomInfo
            });
        };
    }

    /* ------------------------------------------------------------ */
    render() {
        let page_name = this.state.page_name;
        let page;

        // ページのスイッチング
        if (page_name === null) {
            page = (
                <Front
                    debug_mode={this.state.debug_mode}
                    version={this.state.version}
                    shop_id={this.state.shop_id}
                    shop_name={this.state.shop_name}
                    room_name={this.state.room_name}
                    room_num={this.state.room_num}
                    room_info={this.state.room_info}
                    setPageName={this.setPageName()}
                />
            );

        } 
        // /* Network Error */
        // else if (page_name === 'networkError'){
        //     return(
        //         <SimpleTemplate
        //             debug_mode={this.state.debug_mode}
        //             version={this.state.version}
        //             shop_name={this.state.shop_name}
        //             room_name={this.state.room_name}
        //         >
        //             <NetworkErrorPage/>
        //         </SimpleTemplate>
        //     );
        // }

        /* qrcode_complete */
        else if(page_name === 'karatetsuGoComplete') {
            return(
                <SimpleTemplate
                    debug_mode={this.state.debug_mode}
                    version={this.state.version}
                    shop_name={this.state.shop_name}
                    room_name={this.state.room_name}
                >
                    <KaratetsuGoComplete/>
                </SimpleTemplate>
            )
        }
        else {
            page = (
                <Sub
                    debug_mode={this.state.debug_mode}
                    serial={this.state.serial}
                    version={this.state.version}
                    shop_id={this.state.shop_id}
                    shop_name={this.state.shop_name}
                    room_name={this.state.room_name}
                    room_info={this.state.room_info}
                    page_name={page_name}
                    setPageName={this.setPageName()}
                    goFront={this.goFront()}
                />
            );
        }

        return (
            <Wrapper
                debug_mode={this.state.debug_mode}
                version={this.state.version}
                shop_name={this.state.shop_name}
                room_name={this.state.room_name}
            >
                { page }
            </Wrapper>
        );
    };
}

export default App;
