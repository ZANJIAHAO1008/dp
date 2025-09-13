<template>
  <div class="area"></div>
</template>

<script>
import { sczclcApi } from '@/fetch/bigscreen.js';
import * as echarts from 'echarts';
export default {
  name: 'areaChart',
  props: ['selectRangeDate'],
  data() {
    return {
      myChart: null,
      xAxis: [],
      scrz: [],
      zcrz: [],
      cm: [],
      qbxx: [],
      yjzl: [],
      legend: [],
    };
  },
  created() {
    this.sczclc();
  },
  methods: {
    sczclc(type) {
      sczclcApi({type}).then(res => {
        console.log(res, 'sczclc');
        this.xAxis = res.xAxis;
        this.scrz = res.rel[0].nums;
        this.zcrz = res.rel[1].nums;
        this.cm = res.rel[2].nums;
        this.qbxx = res.rel[3].nums;
        this.yjzl = res.rel[4].nums;
        this.legend = res.rel.map(item => item.type);

        this.setChart();
      });
    },
    setData(type) {
      let arr = [];
      switch (type) {
        case 'x':
          for (let i = 0; i < this.selectRangeDate.length; i++) {
            arr.push(this.selectRangeDate[i][1] + '.' + this.selectRangeDate[i][2]);
          }
          break;
        case 's':
          for (let i = 0; i < this.selectRangeDate.length; i++) {
            arr.push((Math.random() * 250).toFixed(0));
          }
          break;

        default:
          break;
      }

      return arr;
    },
    setSeriesData() {
      let arr = [];
      this.config.data.forEach(item => {
        let obj = {
          //   name: item.name,
          type: 'line',
          smooth: true,
          symbol: 'none',
          areaStyle: {
            opacity: 1,
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: item.color[0], // 0% 处的颜色
                },
                {
                  offset: 0.4,
                  color: item.color[0], // 40% 处的颜色
                },
                {
                  offset: 1,
                  color: item.color[1], // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
            // color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            //     offset: 0, color: item.color[0] // 0% 处的颜色
            // },
            //     {
            //         offset: 0.4, color: item.color[0] // 0% 处的颜色
            //     }, {
            //         offset: 1, color: item.color[1] // 100% 处的颜色
            //     }]), //背景渐变色
            // origin: 'start'
          },
          lineStyle: {
            width: 0,
          },
          itemStyle: {
            color: item.color[0],
          },
          data: this.setData('s'),
        };
        arr.push(obj);
      });
      return arr;
    },
    setChart() {
      let option = {
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
        legend: {
          // right: 'center',
          // top: '10%',
          // textStyle: {
          //   color: '#6dd0e3',
          //   fontSize: 10,
          //   fontWeight: 600,
          // },
          type: 'scroll',
          top: '10%',
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
          right: '15%',
          left: '15%',
          data: this.legend,
        },
        grid: {
          left: '5%',
          right: '5%',
          bottom: '5%',
          top: '22%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: this.xAxis,
          boundaryGap: false,
          splitLine: {
            show: false,
            interval: 'auto',
            lineStyle: {
              color: ['#606060'],
            },
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: '#6dd0e3',
            },
          },
          axisLabel: {
            // margin: 10,
            textStyle: {
              color: '#6dd0e3',
              interval: 0,
              fontSize: 9,
              align: 'center',
            },
          },
        },
        yAxis: [
          {
            // name: '(%)',
            type: 'value',
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: true,
              lineStyle: {
                fontSize: 12,
                color: '#6dd0e3',
              },
            },
            axisLabel: {
              textStyle: {
                fontSize: 9,
                color: '#6dd0e3',
              },
            },
            // max: 100,
          },
          {
            // name: '(%)',
            type: 'value',
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: true,
              lineStyle: {
                fontSize: 12,
                color: '#6dd0e3',
              },
            },
            axisLabel: {
              textStyle: {
                fontSize: 9,
                color: '#6dd0e3',
              },
            },
            // max: 100,
          },
        ],
        series: [
          {
            yAxisIndex: 0,
            name: this.legend[0],
            type: 'line',
            // smooth: true,
            // showSymbol: false,
            // symbol: 'circle',
            symbolSize: 6,
            data: this.scrz,
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
                      color: 'rgba(23, 227, 114,.5)',
                    },
                    {
                      offset: 1,
                      color: 'rgba(23, 227, 114,.0)',
                    },
                  ],
                  false
                ),
              },
            },
            itemStyle: {
              normal: {
                color: '#15ee6e',
              },
            },
            lineStyle: {
              normal: {
                width: 1,
              },
            },
          },
          {
            yAxisIndex: 0,
            name: this.legend[1],
            type: 'line',
            // smooth: true,
            // showSymbol: false,
            // symbol: 'circle',
            symbolSize: 6,
            data: this.zcrz,
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
                      color: 'rgba(255, 54, 0,.5)',
                    },
                    {
                      offset: 1,
                      color: 'rgba(255, 54, 0,.0)',
                    },
                  ],
                  false
                ),
              },
            },
            itemStyle: {
              normal: {
                color: '#ff3600',
              },
            },
            lineStyle: {
              normal: {
                width: 1,
              },
            },
          },
          {
            yAxisIndex: 1,
            name: this.legend[2],
            type: 'line',
            // smooth: true,
            // showSymbol: false,
            // symbol: 'circle',
            symbolSize: 6,
            data: this.cm,
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
                      color: 'rgba(0, 115, 237,0.5)',
                    },
                    {
                      offset: 1,
                      color: 'rgba(102, 235, 244,.0)',
                    },
                  ],
                  false
                ),
              },
            },
            itemStyle: {
              normal: {
                color: '#0073ed',
              },
            },
            lineStyle: {
              normal: {
                width: 1,
              },
            },
          },
          {
            yAxisIndex: 1,
            name: this.legend[3],
            type: 'line',
            // smooth: true,
            // showSymbol: false,
            // symbol: 'circle',
            symbolSize: 6,
            data: this.qbxx,
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
              },
            },
            // itemStyle: {
            //   normal: {
            //     color: '#0073ed',
            //   },
            // },
            // lineStyle: {
            //   normal: {
            //     width: 1,
            //   },
            // },
          },
          {
            yAxisIndex: 1,
            name: this.legend[4],
            type: 'line',
            // smooth: true,
            // showSymbol: false,
            // symbol: 'circle',
            symbolSize: 6,
            data: this.yjzl,
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
                      color: 'rgba(0, 115, 237,0.5)',
                    },
                    {
                      offset: 1,
                      color: 'rgba(102, 235, 244,.0)',
                    },
                  ],
                  false
                ),
              },
            },
            // itemStyle: {
            //   normal: {
            //     color: '#0073ed',
            //   },
            // },
            // lineStyle: {
            //   normal: {
            //     width: 1,
            //   },
            // },
          },
        ],
      };

      if (!this.myChart) this.myChart = this.$echarts(this.$el);
      this.myChart.clear();
      this.myChart.resize();
      this.myChart.setOption(option);
    },
  },
  mounted() {
    this.sczclc();
  },
};
</script>

<style lang="less" scoped>
.area {
  height: 100%;
}
</style>