
import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// 导入动态页面组件
import dynamicPage from './dynamicPage';

import Home from './home';

function BasicExample() {
    return (
        <Router>
            <div>
                <ul>
                    <li>
                        <Link to="/">点击按钮加载组件 /</Link>
                    </li>
                    <li>
                        <Link to="/about">切换路由时加载组件 /about</Link>
                    </li>
                </ul>

                <hr />

                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={dynamicPage} />
            </div>
        </Router>
    );
}

export default BasicExample;