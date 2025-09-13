<template>
  <div class="sl-chart"></div>
</template>
<script>
import { getLrlcJtApi } from '@/fetch/bigscreen.js';
export default {
  data() {
    return {
      spinning: false,
      myChart: null,
    };
  },
  mounted() {
    this.getLrlcJt();
  },
  methods: {
    getLrlcJt(type) {
      this.spinning = true;
      getLrlcJtApi({
        // type:9,
      })
        .then(res => {
          this.initChart(res.xAxis, res.lrList, res.lcList);
        })
        .finally(() => {
          this.spinning = false;
        });
    },
    initChart(xAxis, lrList, lcList) {
      let data = {
        xAxisData: xAxis,
        seriesData: [lrList, lcList],
      };
      // let option = {
      //   // backgroundColor: '#2255b4',
      //   color: ['#63caff', '#49beff', '#ddc854', '#ddc854'],
      //   grid: {
      //     top: '23%',
      //     left: '3%',
      //     right: '3%',
      //     bottom: '5%',
      //     containLabel: true,
      //   },
      //   tooltip: {
      //     trigger: 'axis',
      //   },
      //   legend: {
      //     left: 10,
      //     show: false,
      //     textStyle: {
      //       fontSize: 12,
      //       color: '#32effe',
      //     },
      //   },
      //   xAxis: {
      //     type: 'category',
      //     data: data.xAxisData,
      //     splitLine: {
      //       show: false,
      //     },
      //     axisLabel: {
      //       color: '#fff',
      //       fontSize: 11,
      //       // interval: 'auto', // x轴间距
      //       // rotate:30
      //     },
      //     axisTick: {
      //       show: false,
      //     },
      //     axisLine: {
      //       lineStyle: {
      //         color: '#fff',
      //       },
      //     },
      //   },
      //   yAxis: [
      //     {
      //       type: 'value',
      //       nameGap: '30',
      //       min: 0,
      //       axisTick: {
      //         show: false,
      //       },
      //       axisLabel: {
      //         show: true,
      //         fontSize: 12,
      //         color: '#fff',
      //       },
      //       axisLine: {
      //         show: true,
      //         lineStyle: {
      //           color: 'rgba(152, 212, 255, .5)',
      //         },
      //       },
      //       splitLine: {
      //         lineStyle: {
      //           color: 'rgba(152, 212, 255, .1)',
      //         },
      //       },
      //       nameTextStyle: {
      //         color: '#fff',
      //         fontWeight: 400,
      //         fontSize: 12,
      //       },
      //     },
      //   ],
      //   series: [
      //     {
      //       data: data.seriesData[0],
      //       type: 'bar', // 柱图
      //       barMaxWidth: 'auto',
      //       // barWidth: 20,
      //       barWidth: 15,
      //       name: '流入',
      //       itemStyle: {
      //         color: {
      //           x: 0,
      //           y: 0,
      //           x2: 0,
      //           y2: 1,
      //           type: 'linear',
      //           global: false,
      //           colorStops: [
      //             {
      //               offset: 0,
      //               color: '#2A76FF',
      //             },
      //             {
      //               offset: 0.5,
      //               color: '#00A8FF',
      //             },
      //             {
      //               offset: 1,
      //               color: '#00D8FF',
      //             },
      //           ],
      //         },
      //       },
      //     },
      //     // {
      //     //   data: [1, 1, 1, 1, 1],
      //     //   type: 'pictorialBar', // 底部
      //     //   barMaxWidth: '20',
      //     //   symbolOffset: [-13, '50%'],
      //     //   symbolSize: [20, 7],
      //     // },
      //     // {
      //     //   data: data.seriesData[0],
      //     //   type: 'pictorialBar', // 顶部
      //     //   barMaxWidth: '20',
      //     //   symbolPosition: 'end',
      //     //   symbolOffset: [-13, '-50%'],
      //     //   symbolSize: [20, 6],
      //     //   zlevel: 2,
      //     // },
      //     {
      //       data: data.seriesData[1],
      //       type: 'bar', // 柱图
      //       barMaxWidth: 'auto',
      //       // barWidth: 20,
      //       barWidth: 15,
      //       name: '流出',
      //       itemStyle: {
      //         color: {
      //           x: 0,
      //           y: 0,
      //           x2: 0,
      //           y2: 1,
      //           type: 'linear',
      //           global: false,
      //           colorStops: [
      //             {
      //               offset: 0,
      //               color: '#d3a646',
      //             },
      //             {
      //               offset: 0.5,
      //               color: '#d1a044',
      //             },
      //             {
      //               offset: 1,
      //               color: '#e9ea61',
      //             },
      //           ],
      //         },
      //       },
      //     },
      //     // {
      //     //   data: [1, 1, 1, 1, 1],
      //     //   type: 'pictorialBar', // 底部
      //     //   barMaxWidth: '20',
      //     //   symbolOffset: [13, '50%'],
      //     //   symbolSize: [20, 7],
      //     // },
      //     // {
      //     //   data: data.seriesData[1],
      //     //   type: 'pictorialBar', // 顶部
      //     //   barMaxWidth: '20',
      //     //   symbolPosition: 'end',
      //     //   symbolOffset: [13, '-50%'],
      //     //   symbolSize: [20, 6],
      //     //   zlevel: 2,
      //     // },
      //   ],
      // };

      let option = {
        title: {
          // text: '交通出行数量柱图数据',
          textStyle: {
            color: '#75deef',
            fontSize: 12,
            fontWeight: 'normal',
          },
          top: '5%',
          left: '31%',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'none', // 默认为直线，可选为：'line' | 'shadow'
          },
          backgroundColor: '#11367a',
          formatter: '{b}:{c1}',
          textStyle: {
            color: '#6dd0e3',
            fontSize: 10,
          },
        },
        grid: {
           top: '15%',
          left: '1%',
          right: '4%',
          bottom: '15%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            interval: 0,
            color: '#75deef',
            fontSize: 9,
            showMinLabel: true,
          },
          axisLine: {
            lineStyle: {
              color: '#1a3c58',
              width: 2,
            },
          },
          axisTick: { show: false },

          data: data.xAxisData,
        },
        yAxis: [
          {
            type: 'value',
            // min: 0,
            // max: 300,
            axisLabel: {
              color: '#75deef',
              fontSize: 9,
              showMaxLabel: false,
            },
            // name: '(条)',
            nameGap: -5,
            nameTextStyle: {
              color: '#75deef',
              fontSize: 9,
              align: 'right',
              padding: [0, 6, 0, 0],
            },
            axisTick: {
              length: 3,
            },
            axisLine: {
              lineStyle: {
                color: '#1a3c58',
              },
            },

            splitLine: { show: false },
          },
        ],
        series: [
          // {
          //   name: '辅助',
          //   type: 'bar',
          //   barWidth: 12,
          //   itemStyle: {
          //     color: '#252448',
          //   },
          //   data: [300, 300, 300, 300, 300, 300, 300, 300],
          // },
          // {
          //   name: '数据',
          //   type: 'bar',
          //   barWidth: 12,
          //   barGap: '-100%',

          //   data: this.data,
          // },
          {
            data: data.seriesData[0],
            type: 'bar', // 柱图
            barMaxWidth: 'auto',
            // barWidth: 20,
            barWidth: 12,
            name: '流入',
            itemStyle: {
              color: {
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                type: 'linear',
                global: false,
                colorStops: [
                  {
                    offset: 0,
                    color: '#2A76FF',
                  },
                  // {
                  //   offset: 0.5,
                  //   color: '#00A8FF',
                  // },
                  {
                    offset: 1,
                    color: '#00D8FF',
                  },
                ],
              },
            },
          },
          {
            data: data.seriesData[1],
            type: 'bar', // 柱图
            barMaxWidth: 'auto',
            // barWidth: 20,
            barWidth: 12,
            name: '流出',
            itemStyle: {
              color: {
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                type: 'linear',
                global: false,
                colorStops: [
                  {
                    offset: 0,
                    color: '#d3a646',
                  },
                  // {
                  //   offset: 0.5,
                  //   color: '#d1a044',
                  // },
                  {
                    offset: 1,
                    color: '#e9ea61',
                  },
                ],
              },
            },
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
.sl-chart {
  height: 100%;
}
</style>
