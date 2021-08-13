import React, {Component} from 'react';

class Try extends Component {
    render() {
        return (
            <li>
                <b>{this.props.try.try}</b> : {this.props.try.result}
            </li> 
        )
    }
}

export default Try;