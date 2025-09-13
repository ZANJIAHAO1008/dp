import { routerComponents as comps } from './router.config';

// 默认路由
export const constantRouters = [
  /** 登录页 */
  {
    path: '/login',
    name: 'login',
    meta: { title: 'Login - 登录' },
    component: comps.login,
  },
];

// 动态路由
export const dynamicRouters = [
  // {
  //   path: '/',
  //   name: 'index',
  //   component: comps.base,
  //   meta: { title: 'index' },
  //   redirect: '/home',
  //   children: [
  //     {
  //       path: '/home',
  //       name: 'home',
  //       meta: { title: '首页', menuHide: true }, // menuHide 为true时 不在左侧菜单显示
  //       component: comps.home,
  //     },
  //     {
  //       path: '/403',
  //       name: 'error-403',
  //       meta: { title: '403' },
  //       component: comps[403],
  //     },
  //     {
  //       path: '/404',
  //       name: 'error-404',
  //       meta: { title: '404' },
  //       component: comps[404],
  //     },
  //   ],
  // },
  // {
  //   path: '/bigscreen',
  //   name: 'bigScreen',
  //   meta: { title: 'bigScreen' },
  //   component: comps.bigscreen,
  // },

  {
    path: '/',
    redirect: '/bigScreen',
  },
  {
    path: '',
    name: 'home',
    component: comps.home,
    children: [
      {
        path: '/bigScreen',
        name: 'bigScreen',
        component: comps.bigscreen,
      },
      {
        path: '/chinaMap',
        name: 'chinaMap',
        component: comps.chinaMap,
      },
    ],
  },
];

export const routers = [...constantRouters, ...dynamicRouters];
