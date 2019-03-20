/**
 * React团队推荐的使用方案，即react 16.6.0新增React.lazy()使用demo
 */

import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const LoadableComponent = React.lazy(() => import('./importCom'))

// 子模块相关组件
import P1 from './childs/p1';
import P2 from './childs/p2';

import { matchRoutes, renderRoutes } from 'react-router-config';
import routes from './childs/route';

export default (props) => (
    <Suspense fallback={<div>Loading...</div>}>
        <LoadableComponent />
        {/* 嵌套路由的实现：非配置方式 */}

        <Router>
            <div>
                <li>
                    <Link to="/react-recommend/p1">测试路由拆分 - p1页</Link>
                </li>
                <li>
                    <Link to="/react-recommend/p2">测试路由拆分 - p2页</Link>
                </li>

                <Route exact path="/react-recommend/p1" component={P1} />
                <Route exact path="/react-recommend/p2" component={P2} />

            </div>
        </Router>

        {/* 嵌套路由的实现：配置方式 */}
{/* 
        <li>
            <Link to="/react-recommend/p1">测试路由拆分 - p1页</Link>
        </li>
        <li>
            <Link to="/react-recommend/p2">测试路由拆分 - p2页</Link>
        </li>

        {
            // 配置方式渲染组件实现1：用react-router-confgi插件中的renderRoutes方式实现
            renderRoutes(routes)
        }

        {
            // 配置方式渲染组件实现2：遍历routes对象，循环输出多个<Route>对象
            props.routes.map((route, index) => (
                <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    // component={route.component}
                    render={props => (
                        // pass the sub-routes down to keep nesting
                        <route.component {...props} routes={route.routes} />
                    )}
                />
            ))
        }
 */}    
</Suspense>
)
