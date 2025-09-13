<!-- 403页面 -->
<template>
  <div class="error-page">
    <img class="img" :src="require('./images/403.png')" alt="" />
    <!-- <p>您暂无权限，请联系管理员。</p> -->
  </div>
</template>

<script>
export default {
  name: 'Forbidden',
};
</script>
<style lang="less" scoped>
@import './style.less';
</style>
