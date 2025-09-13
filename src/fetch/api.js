import store from '@/store/index.js';
import { message } from 'chinaoly-ui-vue';
import { config } from '@co/api';
export { ajaxApi, ajaxForm, ajaxJson } from '@co/api';
export { loginUrl } from '@co/api-login'; // 登录
export { xtglUrl } from '@co/api-xtgl'; // 系统管理

/** 初始化API */

export const bigScreenUrl = '/api/dp';

export function initApi() {
  config({ loginError: msg => store.dispatch('loginError', msg), message });
}
