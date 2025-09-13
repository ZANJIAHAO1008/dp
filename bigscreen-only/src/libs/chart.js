import echarts from 'echarts';

const color = [
  '#0045e4',
  '#0072e2',
  '#00c7bd',
  '#7c74f3',
  '#5b43ed',
  'rgba(222, 234, 49, 0.8)',
  'rgba(36, 138, 226, 0.8)',
  'rgba(99, 226, 36, 0.8)',
  'rgba(226, 213, 36, 0.8)',
];
const tooltip = {
  trigger: 'item',
  formatter: '{a} <br/>{b} : {c} ({d}%)',
};

const primaryColor = '#66E1FC';
// 折线图
export function getLineOption(data = []) {
  const dataX = data.map(i => i.name);
  const dataY = data.map(i => i.value);
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      axisLabel: {
        color: '#48d1fd',
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#48d1fd',
        },
      },
      data: dataX,
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: '#48d1fd',
      },
      splitLine: {
        show: false,
      },
    },
    series: [
      {
        name: '趋势',
        data: dataY,
        type: 'line',
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(222, 234, 49, 1)', // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(222, 234, 49, 0)', // 100% 处的颜色
              },
            ],
          },
        },
        lineStyle: {
          color: 'rgb(222, 234, 49)',
        },
        symbol: 'none',
      },
    ],
  };
  return option;
}

// 柱状图
export function getBarOption(data = [], extend = {}) {
  const dataX = data.map(i => i.name);
  const dataY = data.map(i => i.value);
  const { limit = 6, color: [colorS = '#A34A1E', colorE = '#FFCA00'] = [] } = extend;
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      axisLabel: {
        color: primaryColor,
      },
      splitLine: {
        show: false,
      },
      data: dataX,
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      splitLine: {
        show: false,
      },
    },
    dataZoom: [
      {
        show: dataX.length > limit,
        type: 'slider',
        xAxisIndex: 0,
        height: 12,
        start: 0,
        end: (limit * 100) / (dataX.length || 1),
        bottom: '1%',
        zoomLock: true,
        textStyle: {
          color: '#fff',
        },
      },
    ],
    series: [
      {
        name: '',
        data: dataY,
        type: 'bar',
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(222, 234, 49, 1)', // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(222, 234, 49, 0)', // 100% 处的颜色
              },
            ],
          },
        },
        lineStyle: {
          color: 'rgb(222, 234, 49)',
        },
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
              {
                offset: 0,
                color: colorS,
              },
              {
                offset: 1,
                color: colorE,
              },
            ]),
            barBorderRadius: [15, 15, 0, 0],
          },
        },
        label: {
          show: true,
          position: 'top',
          color: '#fff',
          fontFamily: 'digital-290',
        },
        barMaxWidth: 12,
      },
    ],
  };
  return option;
}

// 饼图
export function getPieOption(data) {
  const option = {
    color,
    tooltip,
    series: [
      {
        name: '占比',
        type: 'pie',
        radius: '55%',
        center: ['40%', '50%'],
        data,
        label: {
          color: '#fff',
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };
  return option;
}
// 环形图
export function getRingOption(data, extend = {}) {
  const dataX = data.map(i => i.name);
  let map = {};
  data.forEach(i => (map[i.name] = i.value));
  const option = {
    color: ['#33ccff', '#33ff66', '#ff9900'],
    tooltip,
    textStyle: {
      fontFamily: 'Microsoft YaHei',
      fontSize: 24,
    },
    title: {
      text: '总数',
      subtext: extend.total,
      left: '58%',
      top: '42%',
      textStyle: {
        fontSize: 16,
        color: primaryColor,
        textAlign: 'center',
      },
      subtextStyle: {
        color: '#fff',
      },
    },
    legend: {
      type: 'scroll',
      orient: 'vertical',
      left: 10,
      top: 40,
      bottom: 20,
      data: dataX,
      icon: 'circle',
      formatter: function (name) {
        return [`{a|${name}}`, `{b|${map[name]}}`].join('\n');
      },
      textStyle: {
        rich: {
          a: {
            color: primaryColor,
            fontSize: 14,
          },
          b: {
            color: '#fff',
            lineHeight: 40,
            fontFamily: 'digital-290',
          },
        },
      },
    },
    xAxis: {
      show: false,
    },
    yAxis: {
      show: false,
    },
    series: [
      {
        name: '占比',
        type: 'pie',
        radius: ['30%', '50%'],
        center: ['65%', '50%'],
        data,
        label: {
          color: '#fff',
          padding: [0, -10],
          formatter: params => {
            return params.value;
          },
        },
      },
    ],
  };
  return option;
}

// 玫瑰图
export function getRoseOption(data_, extend = {}) {
  let data = JSON.parse(JSON.stringify(data_));
  data.sort((a, b) => a.value < b.value);
  const dataX = data.map(i => i.name);
  let map = {};
  data.forEach(i => (map[i.name] = i.value));
  const option = {
    color: [
      '#ff1900',
      '#ff7200',
      '#ffa900',
      '#ffef00',
      '#d6f800',
      '#1ed200',
      '#33ccff',
      '#ff7200',
      '#0066ff',
      '#9900ff',
    ],
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)',
    },
    legend: {
      // type: 'scroll',
      orient: 'vertical',
      right: 10,
      top: 20,
      bottom: 10,
      data: dataX,
      icon: 'circle',
      formatter: function (name) {
        return [`{a|${name}}`, `{b|${map[name]}}`].join(' ');
      },
      textStyle: {
        fontSize: 14,
        rich: {
          a: {
            color: primaryColor,
          },
          b: {
            color: '#fff',
          },
        },
      },
    },
    xAxis: {
      show: false,
    },
    yAxis: {
      show: false,
    },
    series: [
      {
        name: '',
        type: 'pie',
        radius: ['10%', '60%'],
        center: ['30%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 5,
        },
        label: {
          show: false,
        },
        emphasis: {
          label: {
            show: true,
          },
        },
        data,
      },
    ],
  };
  return option;
}

// 词云
export function getWordcloudOption(data) {
  const option = {
    xAxis: {
      show: false,
    },
    yAxis: {
      show: false,
    },
    series: [
      {
        type: 'wordCloud',
        shape: 'circle',
        left: 'center',
        top: 'center',
        width: '70%',
        height: '80%',
        right: null,
        bottom: null,
        // Global text style
        textStyle: {
          fontFamily: 'sans-serif',
          fontWeight: 'bold',
          // Color can be a callback function or a color string
          color: function () {
            // Random color
            return (
              'rgb(' +
              [Math.round(Math.random() * 160), Math.round(Math.random() * 160), Math.round(Math.random() * 160)].join(
                ','
              ) +
              ')'
            );
          },
        },
        emphasis: {
          focus: 'self',

          textStyle: {
            shadowBlur: 10,
            shadowColor: '#333',
          },
        },
        data,
      },
    ],
  };
  return option;
}
