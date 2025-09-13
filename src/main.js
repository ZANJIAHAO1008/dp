// 需兼容IE时 取消注释（注：引入后可能会导致部署包变大及性能问题）单独部署时引用 子应用时在基座中引用
// babel-polyfill 多次引用会报错 页面无法渲染
if (!window.__POWERED_BY_QIANKUN__) {
  // require('babel-polyfill');
} else {
  // eslint-disable-next-line no-undef
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}

import Vue from 'vue';
// import './mock'; // Mock
import { initRem, getImport, storeTest } from '@co/common';
import { initApi } from '@/fetch/api';
import { router } from './router/index';
import store from './store';
import iView from 'iview';
import * as echarts from 'echarts';
import App from './app.vue';
import utils from './libs/utils';
// 组件库引入
import { Header, Footer, SiderMenu, ActionButton, JsonForm, SpanFit, Image } from 'chinaoly-business-vue'; // 按需引入业务组件

import ChinaOlyUI from 'chinaoly-ui-vue';
import 'chinaoly-ui-vue/dist/chinaoly-ui.less';
import Components from './components';
import img from './libs/img';
import './styles/common.less'; // 全局样式
import './assets/less/index.less';
initRem(); // 初始化rem
initApi(); // 初始化接口配置
// 引入svg图标
const request = require.context('@/images/svgIcon', true, /\.svg$/);
request.keys().forEach(request);

// 组件库引入
Vue.use(ChinaOlyUI); // 注册基础组件
[Header, Footer, SiderMenu, ActionButton, JsonForm, SpanFit, Image].forEach(i => Vue.use(i)); // 注册业务组件
Vue.use(Components); // 注册公共组件
Vue.use(iView);
Vue.prototype.$echarts = function (el) {
  return echarts.init(el, null, { renderer: 'svg' });
};
// 全局配置
Vue.config.productionTip = false;
Vue.prototype.config = window.configOut || {};
Vue.prototype.isQiankun = !!window.__POWERED_BY_QIANKUN__; // 是否是qiankun子应用
Vue.use(utils);
Vue.prototype.$images = img;
let instanceVue = null;

function render(props = {}) {
  const { container } = props;
  instanceVue = new Vue({
    router,
    store,
    render: h => h(App),
    created() {
      // 全局配置message样式
      this.$message.config({ top: '64px', maxCount: 3 });
      store.commit('MENU_THEME'); // 初始化主题
    },
  }).$mount(container ? container.querySelector('#app') : '#app');
}

if (!window.__POWERED_BY_QIANKUN__) {
  const { setCookieUrl } = window.configOut || {};
  // 单点登陆
  if (setCookieUrl) {
    // 若配置了 setCookieUrl，则动态加载该文件，系统支持单点登录
    getImport({ type: 'script', path: `${setCookieUrl}?ver=2.0` });
  } else {
    window.SetToken = undefined;
    console.warn('未配置 setCookieUrl，不支持单点登录');
  }
  render();
}

/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
export async function bootstrap(props) {
  console.info('[vuecli-frame] vue app bootstraped');
}
/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount(props) {
  console.info('[vuecli-frame] props from main framework', props);
  storeTest(props);
  render(props);
}
/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount() {
  instanceVue.$destroy();
  instanceVue.$el.innerHTML = '';
  instanceVue.$off();
  instanceVue = null;
}
