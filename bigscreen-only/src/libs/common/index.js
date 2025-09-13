// 框架公共方法

/**
 * 修改浏览器标签页标题
 * @param {String} title
 */
export const updateTitle = title => {
  const { configOut = {} } = window;
  window.document.title = title || configOut.title || '中奥系统管理';
};
