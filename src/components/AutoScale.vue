<template>
  <div class="auto-scale" :style="{ transform: `scale(${scale})` }">
    <div style="width: 1920px; height: 1080px"><slot></slot></div>
  </div>
</template>
<script>
import _ from 'lodash';
export default {
  name: 'AutoScale',
  data() {
    return {
      scale: 1,
      windowInnerHeight: window.innerHeight,
      windowInnerWidth: window.innerWidth,
    };
  },
  mounted() {
    this.resize();
    window.addEventListener('resize', this.resize);
  },
  destroyed() {
    window.removeEventListener('resize', this.resize);
  },
  methods: {
    resize() {
      return _.debounce(() => {
        this.scale = _.min([window.innerWidth / 1920, window.innerHeight / 1080]);
        this.windowInnerHeight = window.innerHeight;
        this.windowInnerWidth = window.innerWidth;
      }, 100)();
    },
  },
};
</script>
