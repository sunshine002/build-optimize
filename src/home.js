
/**
 * 点击按钮时动态加载组件
 */
import React, { Component } from "react";

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
            </div>);
    }

}

export default A;