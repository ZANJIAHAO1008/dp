<template>
  <co-chart class="type-chart" :chartId="chartId" :option="option" />
</template>

<script>
import { Chart } from 'chinaoly-business-vue';
import {
  getLineOption,
  getBarOption,
  getPieOption,
  getRingOption,
  getRoseOption,
  getWordcloudOption,
} from '@/libs/chart';
require('echarts/lib/chart/bar'); // 引入柱状图组件
require('echarts/lib/chart/pie'); // 引入饼图组件
require('echarts/lib/component/legend'); // 引入图例组件
require('echarts/lib/component/legendScroll');
// require('echarts-wordcloud'); // 引入词云组件

export default {
  components: {
    CoChart: Chart,
  },
  props: {
    chartId: {
      type: String,
      default: 'chart',
    },
    type: {
      type: String,
      validator: v => ['line', 'bar', 'pie', 'ring', 'rose', 'wordcloud'].includes(v),
    },
    data: {
      type: Array,
      default: () => [],
    },
    extend: Object,
  },
  data() {
    return {
      option: {},
    };
  },
  watch: {
    data() {
      this.getOption();
    },
  },
  mounted() {
    this.getOption();
  },
  methods: {
    getOption() {
      const { type, data, extend } = this;
      if (data.length === 0) {
        console.warn('暂无数据', type);
        return;
      }
      let option = {};
      switch (type) {
        case 'line':
          option = getLineOption(data);
          break;
        case 'pie':
          option = getPieOption(data);
          break;
        case 'bar':
          option = getBarOption(data, extend);
          break;
        case 'ring': {
          let total = data.reduce((r, c) => (r += c.value), 0);
          option = getRingOption(data, { total });
          break;
        }
        case 'rose':
          option = getRoseOption(data, extend);
          break;
        case 'wordcloud':
          option = getWordcloudOption(data, extend);
          break;
        default:
          break;
      }
      this.option = option;
    },
  },
};
</script>

<style lang="less" scoped>
.type-chart {
  height: 100%;
}
</style>
