<template>
  <div class="icon-title not-rem clear" :class="{ custom: this.icon }" @click="handleCick">
    <img class="icon-title-img" :src="sIcon" />
    <div class="icon-title-text" v-if="title"><co-span-fit :content="title" :maxLength="8"></co-span-fit></div>
  </div>
</template>
<script>
export default {
  name: 'IconTitle',
  props: {
    icon: String,
    title: String,
  },
  computed: {
    sIcon() {
      return this.icon ? `../../../../static/images/${this.icon}` : require('@/images/bigscreen/triangle.png');
    },
  },
  methods: {
    handleCick() {
      this.$emit('click');
    },
  },
};
</script>
<style lang="less" scoped>
@import '~@/styles/vars';

.icon-title.not-rem {
  position: relative;
  line-height: 32px;
  color: @bs-color-title;
  .icon-title-img {
    position: absolute;
    width: 260px;
    height: 28px;
    margin-right: 12px;
  }
  .icon-title-text {
    margin-left: 32px;
    font-size: 16px;
    font-weight: bold;
    line-height: 24px;
  }
  &.custom &-img {
    width: 37px;
    height: 32px;
  }
  &.custom &-text {
    line-height: 32px;
  }
}
</style>
