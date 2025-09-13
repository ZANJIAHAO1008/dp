<template>
  <div class="area"></div>
</template>

<script>
import { getQbApi } from '@/fetch/bigscreen.js';
import { cityCode } from '@/libs/fjDict.js';
export default {
  name: 'areaChart',
  props: ['config', 'selectRangeDate'],
  data() {
    return {
      myChart: null,
      xAxis: [],
      data: [
        {
          name: '成员数',
          color: ['#feed2c', '#353103'],
          data: [],
        },
        {
          name: '单独编报',
          color: ['#2871ea', '#0a1b41'],
          data: [],
        },
        {
          name: '积累编报',
          color: ['#935adf', '#230f3e'],
          data: [],
        },
        {
          name: '推送数',
          color: ['#e65f2d', '#551f0b'],
          data: [],
        },
        {
          name: '综合编报',
          color: ['#34ebba', '#0b3d2e'],
          data: [],
        },
      ],
      cityCode
    };
  },
  methods: {
    getQb(type) {
      getQbApi({type}).then(res => {
        res.forEach(item => {
          this.xAxis.push(this.cityCode?.[item.fbdw] || item.fbdw);
          this.data[0].data.push(item.cys);
          this.data[1].data.push(item.ddbb);
          this.data[2].data.push(item.jlbb);
          this.data[3].data.push(item.tss);
          this.data[4].data.push(item.zhbb);
        });

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
      this.data.forEach(item => {
        let obj = {
          name: item.name,
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
          data: item.data,
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
            // 坐标轴指示器，坐标轴触发有效
            type: 'none', // 默认为直线，可选为：'line' | 'shadow'
          },
          backgroundColor: '#11367a',
          textStyle: {
            color: '#6dd0e3',
            fontSize: 10,
          },

          formatter: function (params) {
            let str = params[0].name;
            params.forEach(item => {
              str += `<br> ${item.seriesName}: ${item.value}`;
            });
            return str;
          },
        },
        legend: {
          top: '7%',
          left: 'center',
          itemWidth: 7,
          itemHeight: 7,
          textStyle: {
            color: '#75deef',
            fontSize: 12,
          },
        },
        grid: {
         top: '15%',
          left: '5%',
          right: '5%',
          bottom: '5%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
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
          axisLine: {
            show: true,
            lineStyle: {
              color: '#1a3c58',
              width: 2,
            },
          },
          axisTick: { show: false },
          data: this.xAxis,
        },
        yAxis: [
          {
            type: 'value',
            // min: 0,
            // max: 300,
            axisLine: {
              show: true,
              lineStyle: {
                color: '#1a3c58',
              },
            },
            axisLabel: {
              color: '#75deef',
              fontSize: 9,
              showMaxLabel: false,
            },
            axisTick: {
              length: 3,
            },
            // name: this.config.name[0],
            nameGap: -5,
            nameTextStyle: {
              color: '#75deef',
              fontSize: 9,
              align: 'right',
            },
            splitLine: { show: false },
          },
          {
            type: 'value',
            // min: 0,
            // max: 300,
            axisLine: {
              show: true,
              lineStyle: {
                color: '#1a3c58',
              },
            },
            axisTick: {
              length: 3,
            },
            axisLabel: {
              color: '#75deef',
              fontSize: 9,
              showMaxLabel: false,
            },
            // name: this.config.name[1],
            nameTextStyle: {
              color: '#75deef',
              fontSize: 9,
              align: 'left',
            },
            nameGap: -5,
            splitLine: { show: false },
          },
        ],
        series: this.setSeriesData(),
      };

      if (!this.myChart) this.myChart = this.$echarts(this.$el);
      this.myChart.clear();
      this.myChart.resize();
      this.myChart.setOption(option);
    },
  },
  mounted() {
    this.getQb();
  },
};
</script>

<style lang="less" scoped>
.area {
  height: 100%;
}
</style>