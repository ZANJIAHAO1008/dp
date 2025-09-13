<template>
  <div class="jgtj-container">
    <div class="control-panel">
      <div class="control-item">
        <Select
          size="small"
          v-model="selectedDistrict"
          @on-change="onDistrictChange"
          class="control-select"
          placeholder="请选择行政区划"
        >
          <Option v-for="district in districtOptions" :key="district.value" :value="district.value">
            {{ district.label }}
          </Option>
        </Select>
      </div>
      <div class="control-item">
        <DatePicker
          size="small"
          v-model="selectedDate"
          @on-change="onDateChange"
          type="date"
          class="control-date"
          placeholder="请选择日期"
          format="yyyy-MM-dd"
        />
      </div>
    </div>
    <div class="jgtj-chart"></div>
  </div>
</template>

<script>
import { getJgtjApi } from '@/fetch/bigscreen.js';
import { cityCode } from '@/libs/fjDict.js';
export default {
  name: 'JgtjChart',
  data() {
    return {
      cityCode,
      myChart: null,
      spinning: false,
      selectedDistrict: '',
      selectedDate: new Date().toISOString().split('T')[0], // 默认为今天
      allData: [], // 存储所有行政区划的数据
      districtOptions: [], // 行政区划选项
      areaNames: {
        ks: '喀什',
        alt: '阿勒泰',
        wlmq: '乌鲁木齐',
        tc: '塔城',
        kz: '克州',
        bz: '巴州',
        boz: '博州',
        ht: '和田',
        aks: '阿克苏',
        klmy: '克拉玛依',
        tlf: '吐鲁番',
        hm: '哈密',
        cj: '昌吉',
        yl: '伊犁',
        qt: '其他',
        nj: '南疆',
        bj: '北疆',
      },
    };
  },
  mounted() {
    this.initChart();
  },
  methods: {
    // 获取籍贯统计数据
    getJgtjData() {
      this.spinning = true;
      // 处理日期格式，确保API接收到正确的日期字符串
      let dateStr = this.selectedDate;
      if (this.selectedDate instanceof Date) {
        dateStr = this.selectedDate.toISOString().split('T')[0];
      }

      return getJgtjApi({
        cxrq: dateStr,
      })
        .then(res => {
          // 处理接口返回的数据
          let data = [];
          if (res && res.data && Array.isArray(res.data)) {
            data = res.data;
          } else if (Array.isArray(res)) {
            data = res;
          } else if (res) {
            data = [res];
          }

          // 存储所有数据
          this.allData = data;

          // 初始化行政区划选项
          this.initDistrictOptions();

          // 返回当前选中的行政区划数据
          return this.getCurrentDistrictData();
        })
        .catch(error => {
          console.error('获取籍贯统计数据失败:', error);
          this.allData = [];
          return {};
        })
        .finally(() => {
          this.spinning = false;
        });
    },

    // 处理数据，转换为饼图所需格式
    processData(data) {
      const pieData = [];
      const excludeKeys = ['gsdxzqh', 'fq_day', 'zs', 'message', 'serverTime']; // 排除非地区数据

      Object.keys(data).forEach(key => {
        if (!excludeKeys.includes(key) && typeof data[key] === 'number' && data[key] > 0) {
          pieData.push({
            name: this.areaNames[key] || key,
            value: data[key],
            code: key,
          });
        }
      });

      // 按数值大小排序
      return pieData.sort((a, b) => b.value - a.value);
    },

    // 初始化行政区划选项
    initDistrictOptions() {
      if (this.allData.length === 0) return;

      this.districtOptions = this.allData.map(item => ({
        value: item.gsdxzqh,
        label: `${this.cityCode[item.gsdxzqh]}`,
      }));

      // 设置默认选中第一个
      if (this.districtOptions.length > 0 && !this.selectedDistrict) {
        this.selectedDistrict = this.districtOptions[0].value;
      }
    },

    // 获取当前选中行政区划的数据
    getCurrentDistrictData() {
      if (!this.selectedDistrict || this.allData.length === 0) {
        return this.allData.length > 0 ? this.allData[0] : {};
      }

      const currentData = this.allData.find(item => item.gsdxzqh === this.selectedDistrict);
      return currentData || {};
    },

    // 行政区划选择变化处理
    onDistrictChange() {
      this.updateChart();
    },

    // 日期选择变化处理
    onDateChange(date) {
      // 当选择的日期改变时，重新获取数据并渲染图表
      // iView DatePicker返回的是Date对象，需要转换为字符串格式
      if (date) {
        this.selectedDate = date;
        this.getJgtjData().then(data => {
          // 数据获取完成后处理数据并重新渲染图表
          const pieData = this.processData(data);
          this.renderChart(pieData);
        });
      }
    },

    // 更新图表
    updateChart() {
      const data = this.getCurrentDistrictData();
      const pieData = this.processData(data);
      this.renderChart(pieData);
    },

    // 刷新数据
    refreshData() {
      this.initChart();
    },

    // 初始化图表
    initChart() {
      this.getJgtjData().then(data => {
        const pieData = this.processData(data);
        this.renderChart(pieData);
      });
    },

    // 渲染图表
    renderChart(pieData) {
      // 如果没有数据，显示空状态
      if (pieData.length === 0) {
        const option = {
          title: {
            text: '暂无数据',
            textStyle: {
              color: '#75deef',
              fontSize: 14,
            },
            left: 'center',
            top: 'middle',
          },
        };
        if (!this.myChart) this.myChart = this.$echarts(this.$el.querySelector('.jgtj-chart'));
        this.myChart.clear();
        this.myChart.setOption(option);
        return;
      }

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
        tooltip: {
          trigger: 'item',
          backgroundColor: '#11367a',
          textStyle: {
            color: '#6dd0e3',
            fontSize: 10,
          },
          formatter: function (params) {
            return params.name + '<br/>人数: ' + params.value + ' (' + params.percent + '%)';
          },
        },
        legend: {
          show: false,
        },
        series: [
          {
            name: '籍贯统计',
            type: 'pie',
            radius: ['30%', '70%'],
            center: ['50%', '55%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 8,
              borderColor: '#fff',
              borderWidth: 1,
            },
            label: {
              show: true,
              position: 'outside',
              color: '#fff',
              fontSize: 10,
              formatter: function (params) {
                if (params.percent < 3) return ''; // 小于3%不显示标签
                return params.name + '\n' + params.value;
              },
            },
            labelLine: {
              show: true,
              lineStyle: {
                color: '#75deef',
              },
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
            data: pieData.map((item, index) => {
              const colors = [
                '#ff6b6b',
                '#4ecdc4',
                '#45b7d1',
                '#96ceb4',
                '#feca57',
                '#ff9ff3',
                '#54a0ff',
                '#5f27cd',
                '#00d2d3',
                '#ff9f43',
                '#ee5a24',
                '#0abde3',
                '#10ac84',
                '#f368e0',
                '#3742fa',
                '#2f3542',
                '#a55eea',
              ];
              return {
                ...item,
                itemStyle: {
                  color: colors[index % colors.length],
                },
              };
            }),
          },
        ],
      };

      if (!this.myChart) this.myChart = this.$echarts(this.$el.querySelector('.jgtj-chart'));
      this.myChart.clear();
      this.myChart.resize();
      this.myChart.setOption(option);
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
.jgtj-container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.control-panel {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  margin-top: 30px;
  margin-bottom: 10px;
  flex-wrap: nowrap;
}

.control-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.control-label {
  color: #00d4ff;
  font-size: 14px;
  white-space: nowrap;
}

.control-select,
.control-date {
  min-width: 140px;
  width: 140px;
}

// iView组件样式覆盖
.control-select .ivu-select-selection,
.control-date .ivu-input {
  border: 1px solid #75deef !important;
  border-radius: 4px !important;
  background: rgba(17, 54, 122, 0.8) !important;
  color: #75deef !important;
  font-size: 14px !important;
  padding: 6px 12px !important;
}

.control-select .ivu-select-selection:hover,
.control-date .ivu-input:hover {
  border-color: #6dd0e3 !important;
  background: rgba(17, 54, 122, 0.9) !important;
}

.control-select .ivu-select-selection:focus,
.control-date .ivu-input:focus {
  border-color: #6dd0e3 !important;
  box-shadow: 0 0 0 2px rgba(109, 208, 227, 0.2) !important;
}

.control-select .ivu-select-placeholder,
.control-date .ivu-input::placeholder {
  color: rgba(117, 222, 239, 0.6) !important;
}

.control-select .ivu-select-arrow,
.control-date .ivu-icon {
  color: #75deef !important;
}

// 下拉选项样式
.ivu-select-dropdown {
  background: rgba(17, 54, 122, 0.95) !important;
  border: 1px solid #75deef !important;
}

.ivu-option {
  background: transparent !important;
  color: #75deef !important;
}

.ivu-option:hover {
  background: rgba(117, 222, 239, 0.2) !important;
}

.ivu-option-selected {
  background: rgba(117, 222, 239, 0.3) !important;
  color: #fff !important;
}

// 日期选择器弹窗样式
.ivu-date-picker-dropdown {
  background: rgba(17, 54, 122, 0.95) !important;
  border: 1px solid #75deef !important;
}

.ivu-date-picker-cells {
  background: transparent !important;
}

.ivu-date-picker-cells-cell {
  color: #75deef !important;
}

.ivu-date-picker-cells-cell:hover {
  background: rgba(117, 222, 239, 0.2) !important;
}

.ivu-date-picker-cells-cell-selected {
  background: rgba(117, 222, 239, 0.4) !important;
  color: #fff !important;
}
.jgtj-chart {
  flex: 1;
  width: 100%;
}
</style>