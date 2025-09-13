<template>
  <div id="app">
    <!-- <co-spin :spinning="spinning" tip="系统错误,请联系管理员!"> -->
      <router-view />
    <!-- </co-spin> -->
  </div>
</template>

<script>
import bcrypt from 'bcryptjs';
import { rewriteToken } from '@co/api';
import { authOrEncry } from '@co/api-login';
export default {
  name: 'App',
  data() {
    return {
      resizeFn: null,
    };
  },

  mounted() {
    const documentWidth = document.body.offsetWidth;
    const ratio = documentWidth / 1920;
    if (documentWidth > 1920) {
      document.body.style.transform = `scale(${ratio}, ${ratio})`;
    }
    this.resizeFn = this.$debounce(function () {
      const documentWidth = document.body.offsetWidth;
      const ratio = documentWidth / 1920;
      if (documentWidth > 1920) {
        document.body.style.transform = `scale(${ratio}, ${ratio})`;
      }
    }, 200);
    window.addEventListener('resize', this.resizeFn);

    // const salt = bcrypt.genSaltSync(10);
    // const hash = bcrypt.hashSync('Chinaoly@123', salt);
    // authOrEncry({ username: 'admin', password: hash }).then(token => {
    //   rewriteToken(token, 'admin'); // 更新远端token和user
    // });
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeFn);
  },
};
</script>

<style lang="less">
html,
body {
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
}
html {
  font-size: 20px;
}
body {
  transform-origin: left top;
  background-size: 100% 100%;
}
#app {
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
