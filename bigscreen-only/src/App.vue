<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    // 验证token是否正确设置
    const token = this.$cookie.getToken();
    if (token) {
      console.log('Token已成功设置:', token.substring(0, 50) + '...');
    } else {
      this.$cookie.setToken(
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwIjoiODE2NDgwMzcxNTYxRjczQjBGRjZFMDZBMTBFMUYzMTYiLCJhIjoiNkVBM0REQzVFMzQ3MDA5MEMwOEQ4NzFGRDgyOUEyM0YiLCJkIjoiMzUwNjAwMDAwMDAwIiwiZSI6Iuemj-W7uuecgea8s-W3nuW4giIsImYiOiJhZG1pbiIsImoiOiIzNTA2MDAiLCJrIjowLCJsIjoiMCIsInVzZXJuYW1lIjoiYWRtaW4iLCJleHAiOjE3NTc4MDUxNDMsIm5iZiI6MTc1Nzc2MTY0M30.pUZWkYRDtTqb6qWfp_WBCGSEWXXC-PrF8QYurMAdZuw'
      );
    }
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  height: 100%;
  overflow: hidden;
}

#app {
  height: 100vh;
  width: 100vw;
}
</style>
