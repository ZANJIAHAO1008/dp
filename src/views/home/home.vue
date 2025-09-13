<template>
  <div class="home-container">
    <p class="home-text">欢迎来到{{ config.title }}-{{ config.ver }}-micro</p>
  </div>
</template>

<script>
import { getFirstPage } from '@co/common';
import { AppModule } from '@/store/modules';

export default {
  name: 'home',
  beforeRouteEnter(to, from, next) {
    let page = getFirstPage(AppModule.menuList);
    if (page) {
      next({ name: page.name });
    } else {
      next({ path: '/403' });
    }
  },
};
</script>
<style lang="less">
@import './home.less';
</style>
