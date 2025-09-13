<!-- 框架页 -->
<template>
  <div class="main-page flex-height">
    <m-header v-show="headerVisible" />
    <div class="main-container flex-item flex-width">
      <m-sider-menu />
      <div class="single-page-con flex-item flex-height">
        <div class="single-page flex-item">
          <keep-alive :include="cachePage">
            <router-view></router-view>
          </keep-alive>
        </div>
        <!-- <co-footer /> -->
      </div>
    </div>
  </div>
</template>

<script>
import { AppModule } from '@/store/modules';

export default {
  name: 'Main',
  data() {
    return {
      isHeaderShow: true, // 是否显示页头
    };
  },
  computed: {
    cachePage: () => AppModule.cachePage,
    headerVisible() {
      return this.isHeaderShow && !this.isQiankun; // 如果是子应用，头部隐藏
    },
  },
  mounted() {
    const { header: { show: headerShow = true } = {} } = this.config;
    this.isHeaderShow = headerShow;
  },
};
</script>

<style lang="less" scoped>
@import './main.less';
</style>
