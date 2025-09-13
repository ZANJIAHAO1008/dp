<template>
  <div class="data-box">
    <icon-title class="data-box-title" :icon="icon" :title="title" />
    <div class="data-box-content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import IconTitle from '../components/IconTitle';
export default {
  name: 'DataBox',
  components: { IconTitle },
  props: {
    icon: String,
    title: String,
  },
};
</script>
<style lang="less" scoped>
@import '~@/styles/vars';

.data-box {
  position: relative;
  height: 100%;
  padding: 10px;
  &-title {
    position: relative;
    margin-bottom: 8px;
    color: @bs-color-title;
    background-repeat: no-repeat;
    background-position-x: 32px;
    background-size: 100% 100%;
  }
  &-content {
    height: calc(100% - 26px);
  }
  &-text {
    position: absolute;
    top: 0;
    right: 0;
    width: 50%;
    height: 32px;
    line-height: 32px;
    color: #39c;
  }
  &-value {
    margin-left: 4px;
    font-size: x-large;
    color: @bs-color-total;
  }
  &-detail {
    display: flex;
    flex-wrap: wrap;
  }
  &-detail-item {
    width: calc(50% - 16px);
    margin-bottom: 8px;
    margin-left: 8px;
    color: @bs-color-primary;
    background-color: #0066ff26;
    .item-text {
      width: 58%;
      height: 42px;
      line-height: 42px;
      text-align: center;
    }
    .item-value {
      width: 42%;
      height: 100%;
      line-height: 48px;
      text-align: right;
      background-color: #0066ff4d;
    }
  }
}
</style>
