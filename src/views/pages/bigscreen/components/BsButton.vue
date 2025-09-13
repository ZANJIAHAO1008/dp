<template>
  <div class="bs-button" :class="{ active }" @click="handleClick">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'BsButton',
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleClick(e) {
      this.$emit('click', e);
    },
  },
};
</script>
<style lang="less" scoped>
.bs-button {
  display: inline-block;
  padding: 6px 12px;
  line-height: 24px;
  color: #fff;
  cursor: pointer;
  background-image: url('@/images/bigscreen/bs_button.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  &:hover,
  &.active {
    background-image: url('@/images/bigscreen/bs_button_active.png');
  }
}
</style>
