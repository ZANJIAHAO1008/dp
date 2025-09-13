<template>
  <div class="clyj-chart"></div>
</template>

<script>
import { getClyjApi } from '@/fetch/bigscreen.js';
import { cityCode } from '@/libs/fjDict.js';
export default {
  name: 'ClyjChart',
  data() {
    return {
      myChart: null,
      spinning: false,
      cityCode,
    };
  },
  mounted() {
    this.initChart();
  },
  methods: {
    // 获取车辆预警数据
    getClyjData() {
      this.spinning = true;
      return getClyjApi()
        .then(res => {
          // 如果接口返回的数据结构不同，可能需要调整
          return res;
        })
        .finally(() => {
          this.spinning = false;
        });
    },

    // 初始化图表
    initChart() {
      this.getClyjData().then(data => {
        const xAxisData = data.map(item => {
          // 将区域代码转换为可读的区域名称
          return this.cityCode[item.kz2] || item.kz2;
        });
        const seriesData = data.map(item => item.num);

        const option = {
          title: {
            textStyle: {
              color: '#75deef',
              fontSize: 12,
              fontWeight: 'normal',
            },
            top: '0%',
            left: '31%',
          },
          grid: {
            top: '15%',
            left: '8%',
            right: '8%',
            bottom: '15%',
            containLabel: true,
          },
          tooltip: {
            trigger: 'axis',
            backgroundColor: '#11367a',
            textStyle: {
              color: '#6dd0e3',
              fontSize: 10,
            },
            formatter: function (params) {
              return params[0].name + '<br/>预警数量: ' + params[0].value;
            },
          },
          xAxis: {
            type: 'category',
            data: xAxisData,
            axisLabel: {
              color: '#fff',
              fontSize: 10,
              interval: 0,
              rotate: 0,
            },
            axisLine: {
              lineStyle: {
                color: '#2c5aa0',
              },
            },
            splitLine: {
              show: false,
            },
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              color: '#fff',
              fontSize: 10,
            },
            axisLine: {
              lineStyle: {
                color: '#2c5aa0',
              },
            },
            splitLine: {
              lineStyle: {
                color: '#2c5aa0',
                type: 'dashed',
              },
            },
          },
          series: [
            {
              name: '车辆预警',
              type: 'bar',
              data: seriesData,
              barWidth: '5',
              itemStyle: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: '#ff6b6b',
                    },
                    {
                      offset: 1,
                      color: '#ff4757',
                    },
                  ],
                },
                borderRadius: [4, 4, 0, 0],
              },
              emphasis: {
                itemStyle: {
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: '#ff5252',
                      },
                      {
                        offset: 1,
                        color: '#ff1744',
                      },
                    ],
                  },
                },
              },
            },
          ],
        };

        if (!this.myChart) this.myChart = this.$echarts(this.$el);
        this.myChart.clear();
        this.myChart.resize();
        this.myChart.setOption(option);
      });
    },
  },
  beforeDestroy() {
    if (this.myChart) {
      this.myChart.dispose();
    }
  },
};
</script>

<style lang="less" scoped>
.clyj-chart {
  height: 100%;
  width: 100%;
}
</style>
