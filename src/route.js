/**
 * 路由配置
 */

// 导入动态页面组件
import DynamicPage from './dynamicPage';
import ReactRecommend from './react-recommend';

import Home from './home';

import Error from './error';

import childRoute from './childs/route'
export default [
    {
      path: "/",
      exact: true,
      component: Home,
    },
    {
      path: "/about",
      component: DynamicPage
    },
    {
      path: "/react-recommend",
      component: ReactRecommend,
      routes: childRoute
    },
    {
      path: "",
      component: Error
    },
  ]