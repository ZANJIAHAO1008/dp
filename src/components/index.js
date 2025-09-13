// 项目公共组件

import MHeader from './Layout/MHeader';
import MSiderMenu from './Layout/MSiderMenu';
import DetailModal from './DetailModal';
import AutoScale from './AutoScale';
// import DpTitle from './dpTitle.vue'
const Components = [MHeader, MSiderMenu, DetailModal, AutoScale];

export default {
  install: function (Vue) {
    Components.forEach(i => Vue.component(i.name, i));
  },
};
