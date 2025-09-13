// Cookie工具函数
export const cookieUtils = {
  // 设置cookie
  setCookie(name, value, days = 7) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    // 对值进行URL编码以处理特殊字符
    const encodedValue = encodeURIComponent(value);
    document.cookie = `${name}=${encodedValue};expires=${expires.toUTCString()};path=/`;
  },
  
  // 获取cookie
  getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) {
        // 对值进行URL解码
        const encodedValue = c.substring(nameEQ.length, c.length);
        return decodeURIComponent(encodedValue);
      }
    }
    return null;
  },
  
  // 删除cookie
  deleteCookie(name) {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
  },
  
  // 设置token
  setToken(token) {
    this.setCookie('token', token, 30); // token保存30天
  },
  
  // 获取token
  getToken() {
    return this.getCookie('token');
  },
  
  // 删除token
  removeToken() {
    this.deleteCookie('token');
  }
};

export default {
    install: function (Vue) {
        Vue.prototype.$debounce = function ( fn,delay){
            let timer = null //借助闭包
            return function() {
                if(timer){
                    clearTimeout(timer) //进入该分支语句，说明当前正在一个计时过程中，并且又触发了相同事件。所以要取消当前的计时，重新开始计时
                    timer = setTimeout(fn,delay)
                }else{
                    timer = setTimeout(fn,delay) // 进入该分支说明当前并没有在计时，那么就开始一个计时
                }
            }
        };
        
        // 添加cookie工具函数到Vue原型
        Vue.prototype.$cookie = cookieUtils;
    }
}