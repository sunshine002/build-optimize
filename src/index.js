
import React, { Component } from 'react';
import { render } from 'react-dom';

import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { Switch } from 'react-router'

import { matchRoutes, renderRoutes } from 'react-router-config';

// 导入动态页面组件
import DynamicPage from './loadable-dynamic';
import ReactRecommend from './react-recommend-dynamic';

import Home from './home';

import Error from './error';

// 子模块相关组件
import P1 from './childs/p1';
import P2 from './childs/p2';

// import routes from './route';

// 配置路由对象：1. 可通过在入口页中定义routes对象 2. 把此对象进行拆分，通过import导入
// const routes = [
//   {
//     path: "/",
//     exact: true,
//     component: Home,
//   },
//   {
//     path: "/about",
//     component: DynamicPage
//   },
//   {
//     path: "/react-recommend",
//     component: ReactRecommend,
//     routes: [
//       {
//         path: "/react-recommend/p1",
//         component: P1
//       },
//       {
//         path: "/react-recommend/p2",
//         component: P2
//       }
//     ]
//   },
//   {
//     path: "/error",
//     component: Error
//   },
// ];

render(
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">点击按钮加载组件 /</Link>
        </li>
        <li>
          <Link to="/about">切换路由时加载组件（@loadable/component实现方案） /about</Link>
        </li>
        <li>
          <Link to="/react-recommend">切换路由时加载组件（React.lazy()） /react-recommend</Link>
        </li>
        <li><Link to='/no-match'>no match</Link></li>

      </ul>

      <hr />

      {/**
        非配置方式实现路由的配置及组件的渲染
      */}
      
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={DynamicPage} />
        <Route path="/react-recommend" component={ReactRecommend} />
        <Route exact path='*' component={Error} />
      </Switch>

      {/**
       * 配置方式实现路由组件的渲染：
       * 配置方式需要2步：
       * 1. 配置路由对象routes
       * 2. 在要显示的地方进行渲染路由对应的组件
       */}

      {
        // 配置方式实现组件渲染：基于react-router-config进行渲染
        // renderRoutes(routes)
      }
      {
        // 配置方式实现组件的渲染：遍历配置对象数组，循环输出多个<Route>对象
        // routes.map((route, index) => {
        //   return (
        //     <Route
        //       key={index}
        //       path={route.path}
        //       exact={route.exact}
        //       // component={route.component}
        //       render={props => (
        //         // pass the sub-routes down to keep nesting
        //         <route.component {...props} routes={route.routes} />
        //       )}
        //     />
        //   )
        // })
      }

    </div>
  </Router>,
  document.getElementById('app')
);
