<template>
  <div :class="`dashboard not-rem dashboard-${data.icon}`">
    <div class="dashboard-value">{{ data.value }}</div>
    <div class="dashboard-name">{{ data.name }}</div>
  </div>
</template>
<script>
export default {
  name: 'Dashboard',
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>
<style lang="less" scoped>
.dashboard.not-rem {
  position: relative;
  height: 100%;
  text-align: center;
  background: url('./images/red.png') no-repeat;
  background-size: contain;
  &.dashboard-orange {
    background-image: url('./images/orange.png');
  }
  &.dashboard-green {
    background-image: url('./images/green.png');
  }
  .dashboard-name {
    font-size: 14px;
    color: @bs-color-primary;
  }
  .dashboard-value {
    margin-top: 12px;
    font-size: 18px;
    line-height: 70px;
    color: #fff;
  }
}
</style>
