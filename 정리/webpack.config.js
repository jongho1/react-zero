const path = require('path');
const webpack  = require('webpack');
const RefreshWebPackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

//preset-env 뭐 이런데 옵션 넣을 수 잇음
// https://github.com/browserslist

module.exports = {
    mode : 'development', // 실서비스에서는  production
    devtool : 'eval', //빠르게한다 production 일때는 hidden-source-map
    resolve: {
        extensions: ['.js', '.jsx'] // 아래 엔트리에서 확장자 안쓰게 해줌.
    },

    //입력
    entry : {
          // app: ['./client.jsx', './wordRelay.jsx'], // client.jsx 에서 wordRelay를 불러서 쓰고 있기 때문에 client.jsx만 해도 다 불러옴
        app: ['./client'],
    },

    module: {
        rules : [{
            //.jsx 나 .js 파일을 바벨로더로 실행한다.
            test : /\.jsx?/,
            loader: 'babel-loader',
            options: {
                presets : [
                    //최신문법들을 변환시켜줌
                    ['@babel/preset-env', {
                        targets: {
                            browsers : ['> 1% in KR', 'IE 11'],
                        },
                    }],
                    //리액트문법을 변환시켜줌 
                    '@babel/preset-react'
                ],
                plugins: [
                    '@babel/plugin-proposal-class-properties',
                    'react-refresh/babel',
                ],
            }
        }],
    },
    plugins : [
        new webpack.LoaderOptionsPlugin({debug : true}),
        new RefreshWebPackPlugin(),
    ],
    //출력
    output : {
        //현재경로의 dist폴더에 위에서 변환된것들을 app.js 로 만듬
        path: path.join(__dirname, 'dist'),
        filename: 'app.js',
    },

    devServer: {
        publicPath: '/dist/',
        hot : true,
    },
}