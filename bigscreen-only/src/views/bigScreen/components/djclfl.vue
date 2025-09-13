<template>
  <div class="dj-chart"></div>
</template>
<script>
import { getDjclApi } from '@/fetch/bigscreen.js';
export default {
  data() {
    return {
      myChart: null,
    };
  },
  mounted() {
    this.getDjcl();
  },
  methods: {
    getDjcl() {
      getDjclApi().then(res => {
        let data = res.map(v => {
          return {
            name: v.valueName,
            value: v.num,
          };
        });
        this.initChart(data);
      });
    },
    initChart(data) {
      let option = {
        title: {
          // text: '登记车辆分类柱图数据',
          textStyle: {
            color: '#75deef',
            fontSize: 12,
            fontWeight: 'normal',
          },
          top: '0%',
          left: '31%',
        },
        // grid: {
        //   top: '10%',
        //   left: '1%',
        //   right: '4%',
        //   bottom: '0%',
        //   containLabel: true,
        // },
        tooltip: {
          trigger: 'item',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'none', // 默认为直线，可选为：'line' | 'shadow'
          },
          backgroundColor: '#11367a',
          // formatter: '{b}:{c1}',
          textStyle: {
            color: '#6dd0e3',
            fontSize: 10,
          },
        },
        // legend: {
        //   show: false,
        // },
        series: [
          {
            type: 'pie',
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2,
              normal: {
                label: {
                  color: '#00e5ff',
                },
              },
            },
            labelLine: {},
            data: data,
          },
        ],
      };

      if (!this.myChart) this.myChart = this.$echarts(this.$el);
      this.myChart.clear();
      this.myChart.resize();
      this.myChart.setOption(option);
    },
  },
};
</script>
<style lang="less" scoped>
.dj-chart {
  margin-top: 20px;
  height: 100%;
}
</style>
