
/**
 * 点击按钮时动态加载组件
 */

 import _ from 'lodash';

import React, { Component } from "react";
import moment from 'moment';
class A extends Component {
    constructor(props) {
        super(props);
        this.state={
            importInfo: '',
        }
    }

    clickFn = () => {
        import(/* webpackChunkName: "import" */'./importCom').then(component => {
            // debugger
            this.setState({
                importInfo: component.default()
            })
        }).catch(err => {
            console.log("Chunk loading failed");
        });
    }
    render() {
        return (
            <div>
                <button type='button' onClick={this.clickFn}>点击我</button>
                <div>{this.state.importInfo}</div>
                <p>{_.join(['Hello', 'webpack'], ' ')}</p>
                <p>{moment('2019-03-20').format('YYYY.MM.DD')}</p>
            </div>);
    }

}

export default A;