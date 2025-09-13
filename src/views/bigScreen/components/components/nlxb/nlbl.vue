<template>
  <div class="behaviorBar"></div>
</template>

<script>
import { getAgeApi } from '@/fetch/bigscreen';
export default {
  name: '',
  data() {
    return {
      myChart: null,
      colors: ['#2c7bfe', '#c2232a', '#feed2c', '#a262f2', '#62d5f2'],
      data: [
        // {
        //   value: 40,
        //   name: '1-10岁',
        //   itemStyle: {
        //     color: '#2c7bfe',
        //   },
        // },
        // {
        //   value: 60,
        //   name: '11-20岁',
        //   itemStyle: {
        //     color: '#c2232a',
        //   },
        // },
        // {
        //   value: 40,
        //   name: '21-35岁',
        //   itemStyle: {
        //     color: '#feed2c',
        //   },
        // },
        // {
        //   value: 20,
        //   name: '36-55岁',
        //   itemStyle: {
        //     color: '#a262f2',
        //   },
        // },
        // {
        //   value: 80,
        //   name: '55岁以上',
        //   itemStyle: {
        //     color: '#62d5f2',
        //   },
        // },
      ],
      xAxis: [],
      max: 0,
    };
  },
  methods: {
    getAge() {
      getAgeApi().then(res => {
        this.max = Math.max(...res.jjryByAge.map(v => v.num));
        this.data = res.jjryByAge.map((v, i) => {
          this.xAxis.push(v.valueName);
          return {
            value: v.num,
            name: v.valueName,
            itemStyle: {
              color: this.colors[i],
            },
          };
        });

        this.setChart();
      });
    },
    setChart() {
      let option = {
        title: {
          text: '人员年龄柱图数据',
          textStyle: {
            color: '#75deef',
            fontSize: 12,
            fontWeight: 'normal',
          },
          top: '0%',
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

          data: this.xAxis,
        },
        yAxis: [
          {
            type: 'value',
            min: 0,
            max: this.max,
            axisLabel: {
              color: '#75deef',
              fontSize: 9,
              showMaxLabel: false,
            },
            name: '(个)',
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
          {
            name: '辅助',
            type: 'bar',
            barWidth: 12,
            itemStyle: {
              color: '#252448',
            },
            data: [100, 100, 100, 100, 100],
          },
          {
            name: '数据',
            type: 'bar',
            barWidth: 12,
            barGap: '-100%',

            data: this.data,
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
    this.getAge();
  },
};
</script>

<style lang="less" scoped>
.behaviorBar {
  height: 100%;
}
</style>
