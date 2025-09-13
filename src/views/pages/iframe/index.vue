<template>
  <div>
    <iframe class="iframe" frameborder="0" :src="url"></iframe>
  </div>
</template>
<script>
import { AppModule } from '@/store/modules';
export default {
  data() {
    return {};
  },
  computed: {
    url() {
      let iframePages = AppModule.iframePages;
      let url = iframePages[this.$route.name];

      console.log(url, iframePages, this.$route, 'urlurl');
      return url;
    },
  },
};
</script>

<style lang="less" scoped>
.iframe {
  // height: 100vh;
  // width: 100vw;
  width: 100%;
  min-width: 7.3rem;
  height: calc(100vh - 150px);
}
</style>