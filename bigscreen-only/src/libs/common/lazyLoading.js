/* 懒加载公共方法 */
const lazyLoading = name => resolve => require([`@/views${name}`], resolve);
export default lazyLoading;
