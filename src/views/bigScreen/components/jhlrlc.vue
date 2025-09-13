<template>
  <div class="doubleArea"></div>
</template>

<script>
import { jhlrlcApi } from '@/fetch/bigscreen.js';
import * as echarts from 'echarts';
export default {
  name: '',
  props: {
    selectRangeDate: Array,
  },
  data() {
    return {
      myChart: null,
      xAxis: [],
      lrList: [],
      lcList: [],
    };
  },
  methods: {
    lrlcQst(type) {
      jhlrlcApi({type}).then(res => {
        res.fl.forEach(v => {
          this.xAxis.push(v.xzqh);
          this.lrList.push(v.lrs);
          this.lcList.push(v.lcs);
        });

        // this.xAxis = res.xAxis;
        // this.lrList = res.lrList.map(v => {
        //   return v.num;
        // });
        // this.lcList = res.lcList.map(v => {
        //   return v.num;
        // });

        this.setChart();
      });
    },
    setChart() {
      // let option = {
      //   legend: {
      //     // 图例信息
      //     itemWidth: 7,
      //     itemHeight: 7,
      //     textStyle: {
      //       color: '#75deef',
      //       fontSize: 12,
      //     },
      //     right: '5%',
      //     top: '5%',
      //   },
      //   grid: [
      //     {
      //       // 上区域图
      //       top: '20%',
      //       bottom: '45%',
      //       left: '8%',
      //       right: '5%',
      //       containLabel: false,
      //     },
      //     {
      //       // 下区域图
      //       top: '55%',
      //       bottom: '10%',
      //       left: '8%',
      //       right: '5%',
      //       containLabel: false,
      //     },
      //   ],
      //   yAxis: [
      //     {
      //       // 上区域图 y轴
      //       type: 'value',
      //       inverse: false,
      //       splitNumber: 3,
      //       axisLine: {
      //         show: true,
      //         lineStyle: {
      //           color: '#1a3c58',
      //         },
      //       },
      //       name: '(次)',
      //       nameTextStyle: {
      //         color: '#75deef',
      //         fontSize: 10,
      //         padding: [0, 15, -10, 0],
      //       },
      //       axisTick: {
      //         show: true,
      //       },
      //       axisLabel: {
      //         showMaxLabel: true,
      //         color: '#75deef',
      //         fontSize: 9,
      //         fontWeight: 'normal',
      //       },
      //       splitLine: {
      //         show: false,
      //       },
      //     },
      //     {
      //       // 下区域图 y轴
      //       gridIndex: 1,
      //       splitNumber: 3,
      //       inverse: true,
      //       type: 'value',
      //       name: '(人)',
      //       nameLocation: 'end',
      //       nameTextStyle: {
      //         color: '#75deef',
      //         fontSize: 10,
      //         padding: [-10, 25, 0, 0],
      //       },
      //       axisLine: {
      //         show: true,
      //         lineStyle: {
      //           color: '#1a3c58',
      //         },
      //       },
      //       axisTick: {
      //         show: true,
      //       },
      //       position: 'bottom',
      //       axisLabel: {
      //         show: true,
      //         color: '#75deef',
      //         fontSize: 9,
      //         fontWeight: 'normal',
      //         showMaxLabel: true,
      //       },
      //       splitLine: {
      //         show: false,
      //         lineStyle: {
      //           width: 0,
      //         },
      //       },
      //     },
      //   ],
      //   xAxis: [
      //     {
      //       // 上图x轴
      //       type: 'category',
      //       boundaryGap: false,
      //       z: 2,
      //       nameGap: 0,
      //       axisLine: {
      //         show: false,

      //         lineStyle: {
      //           color: '#1a3c58',
      //         },
      //       },
      //       axisTick: {
      //         show: false,
      //       },
      //       axisLabel: {
      //         show: false,
      //       },
      //       data: this.setData('x'),
      //     },
      //     {
      //       // 下图x轴
      //       gridIndex: 1,
      //       type: 'category',
      //       boundaryGap: false,
      //       axisLine: {
      //         show: true,
      //         symbol: ['none', 'arrow'],
      //         symbolSize: [4, 8],
      //         symbolOffset: [0, 8],
      //         lineStyle: {
      //           color: '#1a3c58',
      //         },
      //       },
      //       z: 2,
      //       axisTick: {
      //         show: false,
      //         lineStyle: {
      //           color: '#1a3c58',
      //         },
      //       },
      //       axisLabel: {
      //         show: false,
      //       },
      //       data: this.setData('x'),
      //     },
      //     {
      //       // 最下刻度轴
      //       gridIndex: 1,
      //       position: 'bottom',
      //       type: 'category',
      //       name: '日',
      //       nameLocation: 'end',
      //       nameTextStyle: {
      //         color: '#75deef',
      //         fontSize: 9,
      //         padding: [25, 0, 0, -25],
      //       },
      //       boundaryGap: false,
      //       axisLine: {
      //         // 轴线
      //         show: true,
      //         symbol: ['none', 'arrow'],
      //         symbolSize: [4, 8],
      //         symbolOffset: [0, 8],
      //         lineStyle: {
      //           color: '#1a3c58',
      //         },
      //       },
      //       z: 2,
      //       axisTick: {
      //         // 刻度
      //         show: true,
      //         lineStyle: {
      //           color: '#1a3c58',
      //         },
      //       },
      //       axisLabel: {
      //         // 标签
      //         show: true,
      //         interval: 0,
      //         showMaxLabel: false,
      //         align: 'left',
      //         color: '#75deef',
      //         fontSize: 9,
      //         fontWeight: 'normal',
      //       },
      //       data: this.setData('x'),
      //     },
      //   ],
      //   tooltip: {
      //     // hover 提示框
      //     trigger: 'axis',
      //     axisPointer: {
      //       type: 'line',
      //     },
      //     backgroundColor: '#11367a',
      //     textStyle: {
      //       color: '#6dd0e3',
      //       fontSize: 10,
      //     },
      //     formatter: data => {
      //       if (data[0].componentIndex == 0) {
      //         // hover 到上图的时候
      //         return (
      //           data[0].name +
      //           '<br>' +
      //           data[0].seriesName +
      //           ':' +
      //           data[0].value +
      //           '次' +
      //           '<br>' +
      //           data[1].seriesName +
      //           ':' +
      //           data[1].value +
      //           '次'
      //         );
      //       } else {
      //         return (
      //           data[0].name +
      //           '<br>' +
      //           data[0].seriesName +
      //           ':' +
      //           data[0].value +
      //           '人' +
      //           '<br>' +
      //           data[1].seriesName +
      //           ':' +
      //           data[1].value +
      //           '人'
      //         );
      //       }
      //     },
      //   },
      //   series: [
      //     // 面积图
      //     {
      //       name: '数据1',
      //       type: 'line',
      //       symbol: 'none',
      //       smooth: true,
      //       lineStyle: {
      //         width: 1,
      //         color: {
      //           type: 'linear',
      //           x: 1,
      //           y: 0,
      //           x2: 0,
      //           y2: 0,
      //           colorStops: [
      //             {
      //               offset: 0,
      //               color: 'rgba(250, 206, 21, 1)', // 0% 处的颜色
      //             },
      //             {
      //               offset: 1,
      //               color: 'rgba(253, 116, 48, 1)', // 100% 处的颜色
      //             },
      //           ],
      //           globalCoord: false, // 缺省为 false
      //         },
      //       },
      //       areaStyle: {
      //         opacity: 0.18,
      //         color: 'rgba(243, 121, 46, 1)',
      //       },

      //       itemStyle: {
      //         color: {
      //           type: 'linear',
      //           x: 0,
      //           y: 0,
      //           x2: 0,
      //           y2: 1,
      //           colorStops: [
      //             {
      //               offset: 0,
      //               color: 'rgba(250, 206, 21, 1)', // 0% 处的颜色
      //             },
      //             {
      //               offset: 1,
      //               color: 'rgba(253, 116, 48, 1)', // 100% 处的颜色
      //             },
      //           ],
      //           globalCoord: false, // 缺省为 false
      //         },
      //       },
      //       data: this.setData('s'),
      //     },
      //     {
      //       name: '数据2',
      //       type: 'line',
      //       symbol: 'none',
      //       smooth: true,
      //       lineStyle: {
      //         width: 1,
      //         color: {
      //           type: 'linear',
      //           x: 1,
      //           y: 0,
      //           x2: 0,
      //           y2: 0,
      //           colorStops: [
      //             {
      //               offset: 0,
      //               color: 'rgba(51, 231, 252, 1)', // 0% 处的颜色
      //             },
      //             {
      //               offset: 1,
      //               color: 'rgba(11, 120, 227, 1)', // 100% 处的颜色
      //             },
      //           ],
      //           globalCoord: false, // 缺省为 false
      //         },
      //       },
      //       areaStyle: {
      //         opacity: 0.5,
      //         color: 'rgba(19, 34, 96, 1)',
      //       },
      //       itemStyle: {
      //         color: {
      //           type: 'linear',
      //           x: 0,
      //           y: 0,
      //           x2: 0,
      //           y2: 1,
      //           colorStops: [
      //             {
      //               offset: 0,
      //               color: 'rgba(51, 231, 252, 1)', // 0% 处的颜色
      //             },
      //             {
      //               offset: 1,
      //               color: 'rgba(11, 120, 227, 1)', // 100% 处的颜色
      //             },
      //           ],
      //           globalCoord: false, // 缺省为 false
      //         },
      //       },
      //       data: this.setData('s'),
      //     },
      //     {
      //       name: '数据1',
      //       type: 'line',
      //       symbol: 'none',
      //       smooth: true,
      //       xAxisIndex: 1,
      //       yAxisIndex: 1,
      //       lineStyle: {
      //         width: 1,
      //         color: {
      //           type: 'linear',
      //           x: 1,
      //           y: 0,
      //           x2: 0,
      //           y2: 0,
      //           colorStops: [
      //             {
      //               offset: 0,
      //               color: 'rgba(250, 206, 21, 1)', // 0% 处的颜色
      //             },
      //             {
      //               offset: 1,
      //               color: 'rgba(253, 116, 48, 1)', // 100% 处的颜色
      //             },
      //           ],
      //           globalCoord: false, // 缺省为 false
      //         },
      //       },
      //       areaStyle: {
      //         opacity: 0.18,
      //         color: 'rgba(243, 121, 46, 1)',
      //       },
      //       itemStyle: {
      //         color: {
      //           type: 'linear',
      //           x: 0,
      //           y: 0,
      //           x2: 0,
      //           y2: 1,
      //           colorStops: [
      //             {
      //               offset: 0,
      //               color: 'rgba(250, 206, 21, 1)', // 0% 处的颜色
      //             },
      //             {
      //               offset: 1,
      //               color: 'rgba(253, 116, 48, 1)', // 100% 处的颜色
      //             },
      //           ],
      //           globalCoord: false, // 缺省为 false
      //         },
      //       },
      //       data: this.setData('n'),
      //     },

      //     {
      //       name: '数据2',
      //       type: 'line',
      //       symbol: 'none',
      //       smooth: true,
      //       xAxisIndex: 1,
      //       yAxisIndex: 1,
      //       lineStyle: {
      //         width: 1,
      //         color: {
      //           type: 'linear',
      //           x: 1,
      //           y: 0,
      //           x2: 0,
      //           y2: 0,
      //           colorStops: [
      //             {
      //               offset: 0,
      //               color: 'rgba(51, 231, 252, 1)', // 0% 处的颜色
      //             },
      //             {
      //               offset: 1,
      //               color: 'rgba(11, 120, 227, 1)', // 100% 处的颜色
      //             },
      //           ],
      //           globalCoord: false, // 缺省为 false
      //         },
      //       },
      //       areaStyle: {
      //         opacity: 0.5,
      //         color: 'rgba(19, 34, 96, 1)',
      //       },
      //       itemStyle: {
      //         color: {
      //           type: 'linear',
      //           x: 0,
      //           y: 0,
      //           x2: 0,
      //           y2: 1,
      //           colorStops: [
      //             {
      //               offset: 0,
      //               color: 'rgba(51, 231, 252, 1)', // 0% 处的颜色
      //             },
      //             {
      //               offset: 1,
      //               color: 'rgba(11, 120, 227, 1)', // 100% 处的颜色
      //             },
      //           ],
      //           globalCoord: false, // 缺省为 false
      //         },
      //       },
      //       data: this.setData('n'),
      //     },
      //   ],
      // };

      let option = {
        // backgroundColor: '#080b30',
        title: {
          // text: '哎呦,不错哦',
          textStyle: {
            align: 'center',
            color: '#fff',
            fontSize: 20,
          },
          top: '20%',
          left: 'center',
        },
        legend: {
          data: ['计划流入', '计划流出'],
          type: 'scroll',
          top: '10%',
          right: 'center',
          textStyle: {
            color: '#75deef',
            padding: [3, 0, 0, 0],
            fontSize: 12,
          },
          pageTextStyle: {
            color: '#75deef',
          },
          pageIconSize: 10,
          pageIconColor: '#75deef',
          itemWidth: 12,
          itemHeight: 7,
          // right: '15%',
          // left: '15%',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#ddd',
            },
          },
          backgroundColor: '#11367a',
          textStyle: {
            color: '#6dd0e3',
            fontSize: 10,
          },
        },
        grid: {
          top: '22%',
          left: '5%',
          right: '5%',
          bottom: '35%',
          // containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            axisLine: {
              show: true,
            },
            splitArea: {
              // show: true,
              color: '#f00',
              lineStyle: {
                color: '#f00',
              },
            },
            axisLabel: {
              // margin: 10,
              textStyle: {
                color: '#6dd0e3',
                interval: 0,
                fontSize: 11,
                align: 'center',
              },
              interval: 0,
              formatter: function (value) {
                // debugger;
                return value.split('').join('\n');
              },
            },
            splitLine: {
              show: false,
            },
            boundaryGap: false,
            data: this.xAxis,
          },
        ],

        yAxis: [
          {
            type: 'value',
            min: 0,
            // max: 140,
            splitNumber: 4,
            splitLine: {
              show: false,
              lineStyle: {
                color: 'rgba(255,255,255,0.1)',
              },
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              textStyle: {
                fontSize: 9,
                color: '#6dd0e3',
              },
            },
            axisTick: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: '计划流入',
            type: 'line',
            // smooth: true, //是否平滑
            showAllSymbol: true,
            // symbol: 'image://./static/images/guang-circle.png',
            symbol: 'circle',
            symbolSize: 10,
            lineStyle: {
              normal: {
                color: 'rgba(11, 120, 227, 1)',
                shadowColor: 'rgba(0, 0, 0, .3)',
                shadowBlur: 0,
                shadowOffsetY: 5,
                shadowOffsetX: 5,
              },
            },
            label: {
              show: true,
              position: 'top',
              textStyle: {
                color: 'rgba(11, 120, 227, 1)',
              },
            },
            itemStyle: {
              color: 'rgba(11, 120, 227, 1)',
              borderColor: '#fff',
              borderWidth: 2,
              shadowColor: 'rgba(0, 0, 0, .3)',
              shadowBlur: 0,
              shadowOffsetY: 2,
              shadowOffsetX: 2,
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: 'rgba(108,80,243,0.3)',
                    },
                    {
                      offset: 1,
                      color: 'rgba(108,80,243,0)',
                    },
                  ],
                  false
                ),
                shadowColor: 'rgba(108,80,243, 0.9)',
                shadowBlur: 20,
              },
            },
            data: this.lrList,
          },
          {
            name: '计划流出',
            type: 'line',
            // smooth: true, //是否平滑
            showAllSymbol: true,
            // symbol: 'image://./static/images/guang-circle.png',
            symbol: 'circle',
            symbolSize: 10,
            lineStyle: {
              normal: {
                color: 'rgba(253, 116, 48, 1)',
                shadowColor: 'rgba(0, 0, 0, .3)',
                shadowBlur: 0,
                shadowOffsetY: 5,
                shadowOffsetX: 5,
              },
            },
            label: {
              show: true,
              position: 'top',
              textStyle: {
                color: 'rgba(253, 116, 48, 1)',
              },
            },

            itemStyle: {
              color: 'rgba(253, 116, 48, 1)',
              borderColor: '#fff',
              borderWidth: 2,
              shadowColor: 'rgba(0, 0, 0, .3)',
              shadowBlur: 0,
              shadowOffsetY: 2,
              shadowOffsetX: 2,
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: 'rgba(0,202,149,0.3)',
                    },
                    {
                      offset: 1,
                      color: 'rgba(0,202,149,0)',
                    },
                  ],
                  false
                ),
                shadowColor: 'rgba(0,202,149, 0.9)',
                shadowBlur: 20,
              },
            },
            data: this.lcList,
          },
        ],
      };

      if (!this.myChart) this.myChart = this.$echarts(this.$el);
      this.myChart.clear();
      this.myChart.resize();
      this.myChart.setOption(option);
    },
  },
  watch: {
    selectRangeDate: function () {
      // 检测selectRangeDate 数据变化
      this.setChart();
    },
  },
  mounted() {
    this.lrlcQst();
  },
};
</script>

<style lang="less" scoped>
.doubleArea {
  width: 100%;
  height: 100%;
}
</style>
