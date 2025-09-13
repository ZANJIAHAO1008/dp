<!-- 大屏 -->
<template>
  <div class="overview">
    <auto-scale>
      <div class="container not-rem">
        <div class="part-top">
          <div class="btn-back" @click="onBack">返回</div>
          <img :src="require('@/images/bigscreen/bg_title.png')" />
          <div class="top-text" @click="clickTitle">XX大屏</div>
        </div>
        <div class="part-left fl">
          <data-box title="模块1" style="height: 320px">
            <div class="flmc-div clear">
              <dashboard class="flmc-item fl" v-for="(item, index) in flmcList" :key="index" :data="item" />
            </div>
          </data-box>
          <data-box title="模块2" style="height: 320px">
            <co-chart
              class="chart"
              type="line"
              :data="sjmcData"
              :option="{ ...bsAxis }"
              :multiConfig="{
                value: {
                  lq: '两群数据',
                  yl: '舆论数据',
                  zw: '政务数据',
                  yd: '异动数据',
                  rl: '人力数据',
                  my: '民意数据',
                },
              }"
            />
          </data-box>
        </div>
        <div class="part-center fl">
          <div class="part-center-content"></div>
        </div>
        <div class="part-right fr">
          <data-box title="日历模块" style="height: 420px">
            <calendar :tagList="tagList" @update="handleCalendar" />
          </data-box>
          <data-box title="词云模块" style="height: 200px; margin-top: 40px">
            <type-chart chartId="wordcloud" type="wordcloud" :data="wordcloudData" style="height: 200px" />
          </data-box>
        </div>
        <div class="part-bottom fl clear">
          <data-box class="fl" title="今日事件" style="width: 38%">
            <div class="card-list clear" @mousewheel="onMouseWheel">
              <event-card v-for="(item, index) in eventToday" :key="index" :data="item" />
            </div>
          </data-box>
          <data-box class="fl" title="热点事件" style="width: 60%; margin-left: 2%">
            <div class="card-list clear" @mousewheel="onMouseWheel">
              <event-card v-for="(item, index) in eventToday" :key="index" :data="item" />
            </div>
          </data-box>
        </div>
      </div>
    </auto-scale>
  </div>
</template>

<script>
import { toggleFullScreen } from '@co/common';
import { Chart } from 'chinaoly-business-vue';
import TypeChart from '../bigscreen/components/TypeChart';
import DataBox from './components/DataBox';
// import BsButton from '../bigscreen/components/BsButton';
import Dashboard from './components/Dashboard';
import EventCard from './components/EventCard';
import Calendar from './components/Calendar';

export default {
  components: {
    CoChart: Chart,
    Dashboard,
    TypeChart,
    DataBox,
    // BsButton,
    EventCard,
    Calendar,
  },
  data() {
    return {
      // 中间-总数
      centerTotal: 35355,
      // 中间-左数据
      centerLeftList: [
        { name: '公共安全', value: 0, icon: 'left_1.png' },
        { name: '互联网', value: 0, icon: 'left_2.png' },
        { name: '经济金融', value: 0, icon: 'left_3.png' },
      ],
      // 中间-右数据
      centerRightList: [
        { name: '社会稳定', value: 0, icon: 'right_1.png' },
        { name: '社会治安', value: 0, icon: 'right_2.png' },
        { name: '政治安全', value: 0, icon: 'right_3.png' },
      ],
      flmcList: [], // 分类名称
      sjmcData: [], // 数据名称
      tagList: [], // 敏感节点
      wordcloudData: [], // 词云
      eventToday: [], // 今日事件
      eventHot: [], // 热点事件
      isActiveHot: true, // 是否热点事件
      // 大屏坐标轴样式
      bsAxis: {
        xAxis: { axisLabel: { color: '#66E1FC' } },
        yAxis: { axisLabel: { color: '#66E1FC' } },
      },
    };
  },
  created() {
    this.mockData();
    // this.getData();
    // 自动全屏
    toggleFullScreen(true);
  },
  methods: {
    clickTitle() {
      this.$router.push({ path: '/home' });
    },
    mockData() {
      const random = () => Math.round(Math.random() * 1000);
      this.flmcList = [
        { name: '两群数据', value: 1242, icon: 'red' },
        { name: '舆论数据', value: 2343, icon: 'orange' },
        { name: '政务数据', value: 7556, icon: 'green' },
        { name: '异动数据', value: 3463, icon: 'orange' },
        { name: '人力数据', value: 7532, icon: 'green' },
        { name: '民意数据', value: 5744, icon: 'red' },
      ];
      let sjmcData = [
        { name: '1月', lq: 0, yl: 0, zw: 0, yd: 0, rl: 0, my: 0 },
        { name: '2月', lq: 0, yl: 0, zw: 0, yd: 0, rl: 0, my: 0 },
        { name: '3月', lq: 0, yl: 0, zw: 0, yd: 0, rl: 0, my: 0 },
        { name: '4月', lq: 0, yl: 0, zw: 0, yd: 0, rl: 0, my: 0 },
        { name: '5月', lq: 0, yl: 0, zw: 0, yd: 0, rl: 0, my: 0 },
        { name: '6月', lq: 0, yl: 0, zw: 0, yd: 0, rl: 0, my: 0 },
      ];
      sjmcData.forEach(i => {
        i.lq = random();
        i.yl = random();
        i.zw = random();
        i.yd = random();
        i.rl = random();
        i.my = random();
      });
      this.sjmcData = sjmcData;
      this.wordcloudData = [...this.flmcList];
      this.eventToday = [
        { id: 1, name: '城南厂沥青事件', lq: 999, yl: 999, type: '治安', time: '2020-06-09' },
        { id: 2, name: '城南厂沥青事件2', lq: 999, yl: 999, type: '治安', time: '2020-06-09' },
        { id: 3, name: '城南厂沥青事件3', lq: 999, yl: 999, type: '治安', time: '2020-06-09' },
        { id: 4, name: '城南厂沥青事件4', lq: 999, yl: 999, type: '治安', time: '2020-06-09' },
      ];
      this.eventHot = [...this.eventToday];
    },
    getData() {},
    handleCalendar() {
      // this.tagList
    },
    // 鼠标水平滚动
    onMouseWheel(e) {
      const el = e.path.find(i => i.classList.contains('card-list'));
      if (el) {
        el.scrollLeft -= e.wheelDelta;
        e.preventDefault();
      }
    },
    onBack() {
      this.$router.go(-1);
      toggleFullScreen(false);
    },
  },
};
</script>

<style lang="less" scoped>
@import '~@/styles/vars';

.overview {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: black;
}
.btn-back {
  position: absolute;
  left: 20px;
  top: 20px;
  color: white;
  cursor: pointer;
}
.container.not-rem {
  position: relative;
  height: 100%;
  background-image: url('@/images/bigscreen/bg.jpg');
  .part-top {
    position: relative;
    width: 100%;
    height: 80px;
    text-align: center;
    img {
      height: 100%;
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    .top-text {
      height: 40px;
      margin-top: -70px;
      font-size: 40px;
      color: #fff;
      cursor: pointer;
    }
  }
  .part {
    position: relative;
    width: 25%;
    height: calc(100% - 80px - 320px);
    overflow: hidden;
  }
  .part-left {
    .part;

    padding-right: 2%;
    padding-left: 3%;
  }
  .part-right {
    .part;

    padding-right: 3%;
    padding-left: 4%;
  }
  .part-center {
    .part;

    width: 50%;
    padding-top: 24px;
    color: @bs-color-primary;

    &-content {
      position: relative;
      height: calc(100% - 100px);
      margin-top: 20px;
      img {
        position: absolute;
        left: 50%;
        transform: translate(-50%);
      }
    }
  }
  .part-bottom {
    position: relative;
    width: 100%;
    height: 300px;
    padding: 0 3%;
  }
  .flmc-div {
    height: 100%;
    padding: 28px;
    .flmc-item {
      width: 26%;
      height: 50%;
      margin: 0 3%;
    }
  }
  .chart-box {
    width: calc(83% - 40px);
    padding: 10px;
    margin: 10px;
  }
  .card-list {
    height: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
  }
  ::-webkit-scrollbar {
    display: none;
  }
}
</style>
