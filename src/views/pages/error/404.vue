<!-- 404页面 -->
<template>
  <div class="error-page">
    <img class="img" :src="require('./images/404.png')" alt="" />
    <!-- <p>页面不存在，请联系管理员。</p> -->
  </div>
</template>

<script>
export default {
  name: 'NotFound',
};
</script>
<style lang="less" scoped>
@import './style.less';
</style>
