
/**
 * 切换路由时动态加载组件
 * Code Splitting
 * https://www.smooth-code.com/open-source/loadable-components/docs/getting-started/
 * https://reactjs.org/docs/code-splitting.html#reactlazy
 */
import loadable from '@loadable/component';
//  延迟加载
// import pMinDelay from 'p-min-delay';

import React  from 'react';

// const LoadableComponent = loadable(() => pMinDelay(import('./importCom'), 3000), {
//   fallback: <div>Loading...</div>,
// })

const LoadableComponent = loadable(() => import('./importCom'), {
  fallback: <div>Loading...</div>,
})

export default class LoadableDashboard extends React.Component {
  render() {
    return <LoadableComponent />
  }
}