<template>
  <div class="event-card not-rem" @click="handleCick">
    <span class="card-title"
      ><div class="card-dot"></div>
      <co-span-fit :content="data.name" :maxLength="8"></co-span-fit
    ></span>
    <div class="card-content clear">
      <img class="card-img" :src="sIcon" />
      <div class="card-right fr clear">
        <div class="card-item fl" v-for="(item, index) in list" :key="index">
          <div class="card-name">{{ item.name }}</div>
          <div class="card-value">{{ data[item.key] }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'EventCard',
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      list: [
        { name: '两群', key: 'lq' },
        { name: '舆论', key: 'yl' },
        { name: '事件类型', key: 'type' },
        { name: '时间', key: 'time' },
      ],
    };
  },
  computed: {
    sIcon() {
      return this.icon ? this.icon : require('@/images/bigscreen/event_msg.png');
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
.event-card.not-rem {
  position: relative;
  display: inline-block;
  width: 360px;
  padding: 12px;
  line-height: 32px;
  color: @bs-color-primary;
  .card-dot {
    position: relative;
    display: inline-block;
    width: 6px;
    height: 6px;
    margin-right: 10px;
    background-color: @bs-color-primary;
    border-radius: 4px;
    &::before {
      position: absolute;
      top: -3px;
      left: -3px;
      width: 12px;
      height: 12px;
      content: '';
      border: 1px solid @bs-color-primary;
      border-radius: 5px;
    }
  }
  .card-title {
    padding: 4px 12px;
    border: 1px solid @bs-color-primary;
    border-left-width: 0;
    border-radius: 0 12px 12px 0;
  }
  .card-img {
    width: 35%;
    padding: 4% 0;
  }
  .card-right {
    width: 48%;
  }
  .card-item {
    display: inline-block;
    width: 50%;
  }
  .card-value {
    color: #fff;
  }
}
</style>
