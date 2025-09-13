/**
 * 外部配置文件
 * 不配置时使用默认配置
 */
window.configOut = {
  // eslint-disable-line no-unused-vars
  ver: '3.0.0',
  clientName: 's0611一体化', // 应用名称 查询资源菜单用
  title: '漳州市反恐怖情报信息实战平台', // 标签页标题
  // isAllowMoreLogin: false, //是否允许账号可以登录多个电脑 未定义则允许
  setCookieUrl: 'http://172.27.0.50:83/setCookie-2.0.js',
  webSocketUrl: 'ws://192.168.0.71:7081/websocket', // websocket地址s
  // loginPath: 'http://172.27.2.28:9288/zhangzhou',
  header: {
    // 页头
    show: true, // 是否显示页头 默认不显示(true)
    // noLogo: false, // 是否隐藏logo 默认显示(false)
    // logoUrl: './static/images/icon_header.png', // 产品Logo Url
    // titleCn: '系统管理', // 产品中文名
    // titleEn: 'Platform-System Management', // 产品英文名
    // titleUrl: './static/images/icon_header.png' // 产品名称图片 url
  },
  footer: {
    // 页脚
    show: true, // 是否显示页脚 默认不显示(false)
    noLogo: false, // 是否隐藏logo 默认显示(false)
    // logoUrl: './static/images/icon_footer.png', // 产品Logo Url
    // year: '2020', // 版权年份
    // text: 'chinaoly.com 杭州中奥科技有限公司版权所有  0571-87397108 400-608-7108' // 版权文案
  },
  // 在主应用中使用时 子应用的路由前缀 用以区别各个子应用， 值要与系统管理中资源管理 的英文名称保持一致
  mircoSub: 'vue-frame',
};
