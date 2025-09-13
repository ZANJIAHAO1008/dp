<template>
  <co-header
    :theme="menuTheme"
    :goHome="goHome"
    :userInfo="userInfo"
    :versionLog="versionLog"
    :logout="handleLogout"
    :personalProps="personalProps"
  />
</template>

<script>
import { Socket } from '@co/common';
import { versionLog } from '@/config/version';
import { updateTheme } from '@/libs/common/theme';
import { AppModule, UserModule } from '@/store/modules';

export default {
  name: 'MHeader',
  data() {
    return {
      versionLog, // 版本日志
      personalProps: {
        infoExtList: [{ label: '在线人数', key: 'onlineNumber' }],
        updatePassword: this.updatePassword,
        customList: [
          {
            text: '切换主题',
            clickFun: () => {
              const theme = this.menuTheme === 'dark' ? 'blue' : 'dark';
              updateTheme(theme).then(() => {
                UserModule.updateUserConfig({ theme });
              });
            },
          },
        ],
      },
    };
  },
  computed: {
    menuTheme: () => AppModule.menuTheme,
    userInfo() {
      return {
        ...UserModule.userInfo,
        onlineNumber: UserModule.onlineNumber,
      };
    },
  },
  created() {
    // 获取用户信息
    UserModule.getUser()
      .then(res => {
        this.initWebSocket(res.loginTime.replace(/ /, '_'));
        UserModule.getOnlineNumber(); // 连接socket时不会返回当前人数，需手动调用
        this.getUserInfo();
      })
      .catch(() => console.error('UserModule.getUser: 获取用户信息失败'));
  },
  mounted() {
    !this.isQiankun && document.addEventListener('visibilitychange', this.visibilityChange);
  },
  beforeDestroy() {
    !this.isQiankun && document.removeEventListener('visibilitychange', this.visibilityChange);
  },
  methods: {
    /** 页面可见性状态更新 */
    visibilityChange() {
      // 页面由隐藏切换成显示
      if (!document.hidden) {
        this.getUserInfo(); // 获取用户信息以更新主题等配置
      }
    },
    /** 初始化weosocket */
    initWebSocket(loginTime) {
      const webSocketUrl = this.config.webSocketUrl;
      if (webSocketUrl) {
        new Socket(webSocketUrl + '/' + loginTime, {
          onopen: () => {
            // console.log('open');
          },
          onmessage: e => {
            UserModule.ONLINE_NUMBER(e.data);
          },
          onerror: err => {
            console.error('err:' + err);
          },
        });
      }
    },
    /** 跳转到首页 */
    goHome() {
      AppModule.gotoHome();
    },
    /** 获取用户信息 */
    getUserInfo() {
      UserModule.getUserInfo();
    },
    /** 更新密码 */
    updatePassword(data) {
      return UserModule.updatePassword(data);
    },
    /** 退出登录 */
    handleLogout() {
      UserModule.logout();
    },
  },
};
</script>
