import Vue from 'vue';
import VueRouter from 'vue-router';
import { message } from 'chinaoly-ui-vue';
import { updateTitle } from '@/libs/common';
import { routers } from './router';
import { delay } from '@co/common';
import { rewriteToken, verifySet } from '@co/api';
import { AppModule, UserModule } from '@/store/modules';

Vue.use(VueRouter);
// 路由配置
let { mircoSub = 'mircoSub' } = window.configOut || {};
const RouterConfig = {
  // 如果是当子应用使用时 需要注意 base的值要和 资源管理 的英文名称保持一致
  // 主应用 子应用通过系统管理来配置 资源管理 新增资源
  base: window.__POWERED_BY_QIANKUN__ ? `/${mircoSub}/` : process.env.BASE_URL,
  mode: 'history',
  routes: routers,
};

export const router = new VueRouter(RouterConfig);

// 批量增加路由 router.addRoutes已废弃
function addRoutes(ls) {
  console.log(ls, 'addRoutes');
  ls.forEach(i => router.addRoute(i));
}

// 无需登录的页面
const allowList = ['login', 'bigScreen'];

router.beforeEach((to, from, next) => {
  delay(
    async () => {
      to.meta && updateTitle(to.meta.title);
      const {
        query: { token, user, ...query },
      } = to;
      if (token) {
        // url上带token
        // await rewriteToken(token, user);
      }
      // 刷新页面时，验证远端是否存在token和user，存在则更新本地token和user，不存在会自动删除本地token和user
      // const myToken = await verifySet();
      const myToken = false;
      if (myToken) {
        // 已登录
        // UserModule.IS_LOGIN(true);
        if (to.name === 'login') {
          // 前往的页面是登录页
          // AppModule.gotoHome(); // 跳转首页
          return;
        } else {
          if (AppModule.menuLoaded) {
            if (to.matched.length === 0) {
              next('/404');
            } else {
              next();
            }
          } else {
            // AppModule.getMenuList()
            //   .then(addRoutes)
            //   .finally(() => {
            //     next({ ...to, query });
            //   });
          }
        }
      } else {
        // 未登录
        next();
        // if (allowList.includes(to.name)) {
        //   next();
        // } else {
        //   UserModule.gotoLogin({ query }).finally(() => {
        //     next();
        //   }); // 跳转到统一登录页
        // }
      }
    },
    () => !window.configOut.setCookieUrl || window.SetToken || true
  ); // 未配置setCookieUrl 或 SetToken未初始化完成
});

router.afterEach(function () {
  window.scrollTo(0, 0);
});

router.onError(function (callback) {
  console.error('onError---', callback);
  const { code } = callback;
  if (code === 'MODULE_NOT_FOUND') {
    message.warning('页面不存在');
    if (router.currentRoute.path !== '/404') {
      router.push({ path: '/404' });
    }
  } else {
    console.error(callback);
  }
});

AppModule.ROUTER(router); // 保存路由实例
