import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import * as echarts from 'echarts';
import utils from './libs/utils';
import { Header, Footer, SiderMenu, ActionButton, JsonForm, SpanFit, Image } from 'chinaoly-business-vue'; // 按需引入业务组件
// import './styles/index.less';
import ChinaOlyUI from 'chinaoly-ui-vue';
import img from './libs/img';
import './assets/less/index.less';
import 'chinaoly-ui-vue/dist/chinaoly-ui.less';
// 全局配置
Vue.config.productionTip = false;

// 使用iView
Vue.use(iView);
Vue.use(utils);
Vue.use(ChinaOlyUI); // 注册基础组件
Vue.prototype.$images = img;
[Header, Footer, SiderMenu, ActionButton, JsonForm, SpanFit, Image].forEach(i => Vue.use(i)); // 注册业务组件
// 全局注册echarts
Vue.prototype.$echarts = function (el) {
  return echarts.init(el, null, { renderer: 'svg' });
};

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
