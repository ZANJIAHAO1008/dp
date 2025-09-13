<template>
  <div class="main">
    <ChinaMap
      :title="chooseLi"
      :list="listObj && listObj[chooseLi] ? listObj[chooseLi] : []"
      v-if="chooseLi == '跨省'"
      @map-clicked="handleMapClick"
    ></ChinaMap>
    <FujianMap
      :title="chooseLi"
      :list="listObj && listObj[chooseLi] ? listObj[chooseLi] : []"
      v-if="chooseLi !== '跨省' && chooseLi == '跨区市'"
      @map-clicked="handleMapClick"
    ></FujianMap>
    <ZhangZhouMap
      :title="chooseLi"
      :list="listObj && listObj[chooseLi] ? listObj[chooseLi] : []"
      v-if="chooseLi !== '跨省' && chooseLi !== '跨区市'"
      @map-clicked="handleMapClick"
    ></ZhangZhouMap>
    <ul class="leftTipBar">
      <li
        v-for="(item, index) in leftLiList"
        :class="chooseLi === item.name ? 'clickLi' : ''"
        :key="index"
        @click="clickRyBtn(item.name, true)"
      >
        <img v-if="chooseLi === item.name" style="width: 60px; height: 65px" src="@/images/u14669.png" alt="" />
        <img v-else style="width: 60px; height: 65px" src="@/images/u14661.png" alt="" />
        <div class="labelList">
          <span class="label">{{ item.name }}</span>
          <span class="value">{{ item.value }}人</span>
        </div>
      </li>

      <!-- <li :class="chooseLi === '关注人员' ? 'clickLi' : ''" @click="clickRyBtn('关注人员')">
        <img style="width: 60px; height: 65px" src="@/images/u14661.png" alt="" />
        关注人员
      </li>
      <li :class="chooseLi === '可疑人员' ? 'clickLi' : ''" @click="clickRyBtn('可疑人员')">
        <img style="width: 60px; height: 65px" src="@/images/u14661.png" alt="" />
        可疑人员
      </li>
      <li :class="chooseLi === '跨区市' ? 'clickLi' : ''" @click="clickRyBtn('跨区市')">
        <img style="width: 60px; height: 65px" src="@/images/u14661.png" alt="" />
        跨区市
      </li>
      <li :class="chooseLi === '跨省' ? 'clickLi' : ''" @click="clickRyBtn('跨省')">
        <img style="width: 60px; height: 65px" src="@/images/u14661.png" alt="" />
        跨省
      </li> -->
    </ul>
    <ul class="rightTipBar">
      <li
        v-for="(item, index) in rightLiList"
        :class="chooseLi === item.name ? 'clickLi' : ''"
        :key="index"
        @click="clickRyBtn(item.name)"
      >
        <div class="labelList">
          <span class="label">{{ item.name }}</span>
          <span class="value">{{ item.value }}人</span>
        </div>
        <img v-if="chooseLi === item.name" style="width: 60px; height: 65px" src="@/images/u14669.png" alt="" />
        <img v-else style="width: 60px; height: 65px" src="@/images/u14661.png" alt="" />
      </li>
      <!-- <li :class="chooseLi === '重点目标' ? 'clickLi' : ''" @click="clickRyBtn('重点目标')">
        <img style="width: 60px; height: 65px" src="@/images/u14661.png" alt="" />
        重点目标
      </li>
      <li :class="chooseLi === '重点人员' ? 'clickLi' : ''" @click="clickRyBtn('重点人员')">
        <img style="width: 60px; height: 65px" src="@/images/u14661.png" alt="" />
        重点人员
      </li>
      <li :class="chooseLi === '模型预警' ? 'clickLi' : ''" @click="clickRyBtn('模型预警')">
        <img style="width: 60px; height: 65px" src="@/images/u14661.png" alt="" />
        模型预警
      </li> -->
    </ul>

    <svg class="guideLine" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 783 500">
      <!-- <mine-map ref="map"></mine-map> -->

      <!-- <image
        x="5%"
        y="20"
        :xlink:href="$images.center"
        width="90%"
        height="100%"
      /> -->
      <image x="250" y="320" :style="{ opacity: number }" :xlink:href="$images.normal_bg" width="250" height="170" />
      <!-- <image
        v-else
        id="textBox_1"
        x="220"
        y="110"
        :xlink:href="$images.sensitive_bg"
        width="300"
        height="170"
      /> -->
      <template v-if="false">
        <g v-for="(item, index) in swiperData" :key="item.title">
          <image
            class="bg_img"
            :x="item.image.x"
            :y="item.image.y"
            :xlink:href="item.status ? $images.sensitive_title : $images.normal_title"
            width="130"
            height="50"
          />
          <foreignObject
            class="title_1"
            @mouseenter="onmouseenter"
            @mouseleave="onmouseleave"
            :x="item.pos.x"
            :y="item.pos.y"
            :id="'title_' + (index + 1)"
            width="100"
            height="40"
          >
            <div class="title-text-box" xmlns="http://www.w3.org/1999/xhtml">
              <p :style="{ color: item.status ? '#FFDBDB' : '' }">
                <span class="titleText">{{ item.title }}</span>
                <Rate :show-text="false" disabled v-model="item.rate"></Rate>
              </p>
            </div>
          </foreignObject>
          <foreignObject class="text" x="250" y="320" ref="textBox" width="250" height="170">
            <div class="text-box" xmlns="http://www.w3.org/1999/xhtml">
              <div class="promptBox">
                <div class="promptTitle">{{ item.title }}</div>
                <div class="psychologyContent">对当前模块的一些描述...</div>
              </div>
            </div>
          </foreignObject>
          <path
            :id="'line_' + (index + 1)"
            :class="item.path.className"
            :d="item.path.d"
            stroke="#AFE5FB"
            stroke-width="2"
            fill="none"
          />
        </g>
      </template>
    </svg>
  </div>
</template>

<script>
// import mineMap from './minemap.vue';
import ChinaMap from './components/map/chinaMap.vue';
import FujianMap from './components/map/fujianMap.vue';
import ZhangZhouMap from './components/map/zhangzhouMap.vue';
import {
  getZdmbApi,
  getZdmbCountApi,
  getGzryApi,
  getKyryApi,
  getZdryApi,
  getZdryListApi,
  getGzryListApi,
  getKyryListApi,
  getZdmbListApi,
  getKsListApi,
  getQsListApi,
} from '@/fetch/bigscreen.js';
import { zhangzhou } from '@/libs/zhangzhou.js';
import { cityCode } from '@/libs/fjDict.js';
export default {
  name: '',
  components: {
    // mineMap,
    ChinaMap,
    FujianMap,
    ZhangZhouMap,
  },
  props: {
    selectRangeDate: Array,
    _width: Number,
  },
  data() {
    return {
      listObj: null,
      cityCode,
      zhangzhou,
      settimeFlag: false,
      timers: [],
      ryList: [],
      liList: [
        {
          name: '关注人员',
          value: 0,
        },
        {
          name: '可疑人员',
          value: 0,
        },
        {
          name: '跨区市',
          value: 0,
        },
        {
          name: '跨省',
          value: 0,
        },
        {
          name: '重点目标',
          value: 0,
        },
        {
          name: '重点人员',
          value: 0,
        },
        {
          name: '模型预警',
          value: 0,
        },
      ],
      chooseLi: null,
      timer1: null,
      status: false,
      timer: null,
      rid: null,
      index: 0,
      number: 0,
      length: 0,
      frames: 0,
      isIE: false,
      swiperData: [
        {
          image: {
            x: 0,
            y: 354,
          },
          status: false,
          rate: 0,
          title: '标题一',
          pos: {
            x: 17,
            y: 364,
          },
          path: {
            d: 'M150,402 L150,432 250,432',
            className: 'swap1',
          },
        },
        {
          image: {
            x: 58,
            y: 224,
          },
          status: false,
          rate: 0,
          title: '重点目标及数量',
          pos: {
            x: 76,
            y: 232,
          },
          path: {
            d: 'M125,272 L125,337 250,337',
            className: 'swap2',
          },
        },
        {
          image: {
            x: 87,
            y: 110,
          },
          status: false,
          rate: 0,
          title: '重点人员及数量',
          pos: {
            x: 105,
            y: 118,
          },
          path: {
            d: 'M207,135 L260,135 260,322',
            className: 'swap3',
          },
        },
        {
          image: {
            x: 310,
            y: 40,
          },
          status: false,
          rate: 0,
          title: '关注人员及数量',
          pos: {
            x: 328,
            y: 49,
          },
          path: {
            d: 'M319,66 L279,66 279,321',
            className: 'swap4',
          },
        },
        {
          image: {
            x: 522,
            y: 110,
          },
          status: false,
          rate: 0,
          title: '可疑人员及数量',
          pos: {
            x: 538,
            y: 118,
          },
          path: {
            d: 'M538,135 L485,135 485,322',
            className: 'swap3',
          },
        },
        {
          image: {
            x: 560,
            y: 224,
          },
          status: false,
          rate: 0,
          title: '模型预警数',
          pos: {
            x: 578,
            y: 230,
          },
          path: {
            d: 'M625,272 L625,337 500,337',
            className: 'swap2',
          },
        },
        {
          image: {
            x: 538,
            y: 354,
          },
          status: false,
          rate: 0,
          title: '标题七',
          pos: {
            x: 555,
            y: 364,
          },
          path: {
            d: 'M600,402 L600,432 500,432',
            className: 'swap1',
          },
        },
      ],
      psychologicalRate: 0,
      speechRate: 0,
      internetPreferenceRate: 0,
      riskRate: 0,
      makeFriendRate: 0,
      entertainmentPreferenceRate: 0,
      consumptionCharacteristicsRate: 0,
      psychologicalStatus: false,
      speechStatus: false,
      internetPreferenceStatus: false,
      riskStatus: false,
      entertainmentPreferenceStatus: false,
      makeFriendStatus: false,
      consumptionCharacteristicsStatus: false,
      restartTimer: null,
      interval: null,
    };
  },
  computed: {
    leftLiList() {
      let list = [];
      for (const [index, item] of this.liList.entries()) {
        if (index <= 3) {
          list.push(item);
        }
      }
      return list;
    },
    rightLiList() {
      let list = [];
      for (const [index, item] of this.liList.entries()) {
        if (index > 3) {
          list.push(item);
        }
      }
      return list;
    },
    zzxzqhJwd() {
      let obj = {};
      for (const item of this.zhangzhou.features) {
        obj[item.properties.adcode] = item.properties.center;
      }

      return obj;
    },
  },
  methods: {
    init() {
      // 重点目标
      getZdmbCountApi({}).then(res => {
        // console.log(res);

        let count = 0;

        res.forEach(item => {
          if (item.cout) {
            count += Number(item.cout);
          }
        });

        this.liList[4].value = count;
      });

      // 关注人员
      getGzryApi({}).then(res => {
        // console.log(res);

        this.liList[0].value = res;
      });

      // 可疑人员
      getKyryApi({}).then(res => {
        // console.log(res);

        this.liList[1].value = res;
      });

      // 重点人员
      getZdryApi({}).then(res => {
        this.liList[5].value = res.length;
      });

      this.initRyList();
    },
    initRyList() {
      this.listObj = {};
      // 重点人员
      getZdryListApi({}).then(res => {
        let list = res.map(v => {
          if (v.zzdjd && v.zzdwd) {
            v.value = [Number(v.zzdjd), Number(v.zzdwd)];
          }
          v.name = v.djgzryZwm;
          v.djgzryZwm = v.djgzryZwm;
          v.djgzryXb = v.djgzryXb;
          v.djgzrySfzh = v.djgzrySfzh;
          v.djgzryZyskxyqk = v.djgzryZyskxyqk;
          v.djgzryDjsx = v.djgzryDjsx;
          v.djgzryKzjb = v.djgzryKzjb;
          v.djgzryZzd = v.djgzryZzd;
          return v;
        });

        this.listObj['重点人员'] = list;
      });

      // 关注人员
      getGzryListApi({}).then(res => {
        // console.log(res, '关注人员');
        let list = res.map(v => {
          v.value = this.zzxzqhJwd[v.pcsdm];
          v.name = this.cityCode?.[v.pcsdm] || v.pcsdm;
          return v;
        });
        this.listObj['关注人员'] = list;

        console.log(list,'listlist')
      });

      // 重点目标
      getZdmbListApi({}).then(res => {
        // console.log(res, '关注人员');
        let list = res.map(v => {
          v.value = this.zzxzqhJwd[v.xzbm];
          v.name = v.xzqh;
          return v;
        });
        this.listObj['重点目标'] = list;
      });

      // 可疑人员
      getKyryListApi({}).then(res => {
        let list = res.map(v => {
          if (this.zzxzqhJwd[v?.hdxxZrdw?.substring(0, 6)]) {
            v.value = this.zzxzqhJwd[v?.hdxxZrdw?.substring(0, 6)];
          }

          if (v.value) {
            v.value[0] = Number(`${v.value[0]}${Math.floor(Math.random() * 100)}`);
          }
          v.name = v.djgzryZwm;
          v.djgzryZwm = v.hdxxXm;
          v.djgzryXb = '';
          v.djgzrySfzh = v.hdxxSfzh;
          v.djgzryZyskxyqk = v.hdxxXxly;
          v.djgzryDjsx = v.hdxxFbsj;
          v.djgzryKzjb = v.hdxxGzdj;
          v.djgzryZzd = v.hdxxDqhdxx;
          return v;
        });
        this.listObj['可疑人员'] = list;
      });

      getKsListApi({}).then(res => {
        res.lrList = res.lrList.map(v => {
          return [
            {
              name: v?.lx.split('-')[0].replaceAll(' ', ''),
              value: v.num,
              type: '流入',
              ksd: v.lx.split('-')[0].replaceAll(' ', ''),
              jsd: '福建省',
            },
          ];
        });

        res.lcList = res.lcList.map(v => {
          return [
            {
              name: v?.lx.split('-')[1].replaceAll(' ', ''),
              value: v.num,
              type: '流出',
              jsd: v.lx.split('-')[0].replaceAll(' ', ''),
              ksd: '福建省',
            },
          ];
        });

         let list = [...res.lrList, ...res.lcList];

        // this.ryList = res;
        this.listObj['跨省'] = list;

        this.liList[3].value = list.length;

        // console.log(this.liList,'this.liListthis.liList')
          });

      // 跨区县
      getQsListApi({}).then(res => {
        let lrList = [];
        let lcList = [];

        res.forEach(v => {
          if (Number(v.lrNum)) {
            lrList.push([
              {
                name: v.xzqh,
                value: Number(v.lrNum),
                type: '流入',
              },
            ]);
          }

          if (Number(v.lcNum)) {
            lcList.push([
              {
                name: v.xzqh,
                value: Number(v.lcNum),
                  type: '流出',
              },
            ]);
          }
        });

        let list = [...lrList, ...lcList];

        this.listObj['跨区市'] = list;

        this.liList[2].value = list.length;
      });
    },
    TimingLi() {
      // Clear existing timers and intervals
      this.timers.forEach(timer => clearTimeout(timer));
      this.timers = [];
      clearInterval(this.interval);

      let fun = () => {
        if (!this.settimeFlag) {
          for (const [index, item] of this.liList.entries()) {
            const timer = setTimeout(() => {
              if (!this.settimeFlag) {
                this.clickRyBtn(item.name, false);
              }
            }, index * 12000); // 延长到12秒间隔，让切换更慢
            this.timers.push(timer);
          }
        }
      };
      fun();
      this.interval = setInterval(() => {
        if (!this.settimeFlag) {
          fun();
        }
      }, 84000); // 总循环时间调整为84秒 (7个项目 * 12秒)
    },
    clickRyBtn(name, type) {
      this.settimeFlag = type;
      this.chooseLi = name;
      if (type) {
        clearTimeout(this.restartTimer);
        this.restartTimer = setTimeout(() => {
          this.settimeFlag = false;
          this.TimingLi();
        }, 300000); // 5分钟 (300000毫秒)
      }
    },
    handleMapClick() {
      // 点击地图后暂停循环5分钟
      this.settimeFlag = true;
      clearTimeout(this.restartTimer);
      this.restartTimer = setTimeout(() => {
        this.settimeFlag = false;
        this.TimingLi();
      }, 300000); // 5分钟 (300000毫秒)
    },
    // mouseenter
    onmouseenter(e) {
      document.querySelectorAll('.text').forEach(item => (item.style.opacity = 0));
      document.querySelectorAll('.swap1').forEach(item => (item.style.strokeDashoffset = 130));
      document.querySelectorAll('.swap2').forEach(item => (item.style.strokeDashoffset = 190));
      document.querySelectorAll('.swap3').forEach(item => (item.style.strokeDashoffset = 240));
      document.querySelectorAll('.swap4').forEach(item => (item.style.strokeDashoffset = 295));
      cancelAnimationFrame(this.rid);
      this.rid = null;
      clearTimeout(this.timer);
      this.timer = null;
      this.animation(Number(e.currentTarget.id.substr(e.currentTarget.id.length - 1, 1)), true);
    },
    //mouseleave
    onmouseleave() {
      this.animation(1, false);
    },
    frame() {
      cancelAnimationFrame(this.rid);
      this.rid = null;
      this.rid = requestAnimationFrame(this.frame);
      let line = document.querySelector('#line_' + this.index);
      line.style.strokeDashoffset = this.frames;
      line.getPointAtLength(this.length - this.frames);
      line.getPointAtLength((this.length - this.frames + 2) % this.length);
      if (this.index > 1) {
        line = document.querySelector('#line_' + (this.index - 1));
        this.$refs.textBox[this.index - 2].style.opacity = 0;
        line.style.strokeDashoffset = line.style.strokeDasharray;
      }
      if (this.index === 1) {
        for (let i = 2; i < 8; i++) {
          line = document.querySelector('#line_' + i);
          this.$refs.textBox[i - 1].style.opacity = 0;
          line.style.strokeDashoffset = line.style.strokeDasharray;
        }
      }
      this.$refs.textBox[this.index - 1].style.opacity = this.number;
      this.number += 5 / this.length;
      this.frames -= 5;
      if (this.frames <= -5) {
        cancelAnimationFrame(this.rid);
        this.rid = null;
      }
    },
    animation(i, boolean) {
      clearTimeout(this.timer);
      cancelAnimationFrame(this.rid);
      this.rid = null;
      this.timer = null;
      if (i > 7) {
        i = 1;
      }
      this.swiperData.forEach(item => (item.status = false));
      this.swiperData[i - 1].status = true;
      const line = document.querySelector('#line_' + i);
      this.length = line.getTotalLength();
      line.style.strokeDasharray = this.length;
      line.style.strokeDashoffset = this.length;
      this.frames = this.length;
      this.index = i;
      this.number = 0;
      this.frame();
      if (!boolean) {
        clearTimeout(this.timer);
        this.timer = null;
        this.timer = setTimeout(() => {
          this.animation(i + 1, boolean);
        }, 5000);
      }
    },
    // 中心图
    setChart() {
      clearTimeout(this.timer1);
      clearTimeout(this.timer);
      cancelAnimationFrame(this.rid);
      this.frames = 0;
      this.rid = null;
      this.timer = null;
      this.timer1 = null;
      this.timer1 = setTimeout(() => {
        this.animation(1, false);
      }, 5000);
    },
  },
  watch: {
    selectRangeDate: function () {
      this.setChart();
    },
  },
  created() {
    if (!window.SVGForeignObjectElement) {
      this.isIE = true;
    }
    this.init();
  },
  beforeDestroy() {
    // 离开页面动画初始化
    document.querySelectorAll('.text').forEach(item => (item.style.opacity = 0));
    document.querySelectorAll('.swap1').forEach(item => (item.style.strokeDashoffset = 130));
    document.querySelectorAll('.swap2').forEach(item => (item.style.strokeDashoffset = 190));
    document.querySelectorAll('.swap3').forEach(item => (item.style.strokeDashoffset = 240));
    document.querySelectorAll('.swap4').forEach(item => (item.style.strokeDashoffset = 295));
    cancelAnimationFrame(this.rid);
    this.rid = null;
    clearTimeout(this.timer);
    clearTimeout(this.timer1);
    this.timer = null;
    this.timer1 = null;
    this.swiperData.forEach(item => (item.status = false));
  },
  mounted() {
    this.setChart();
    this.TimingLi();
  },
};
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
  position: relative;

  .leftTipBar {
    position: absolute;
    left: 3px;
    top: 5px;
    z-index: 999;

    li {
      // cursor: pointer;
      // border: 1px solid #3ffff8;
      margin-top: 20px;
      font-size: 14px;
      cursor: pointer;
      // width: 90px;
      height: 90px;
      color: #6eddf1;
      display: flex;
      // flex-direction: column;
      align-items: center;
      border-radius: 7px;

      .labelList {
        display: flex;
        flex-direction: column;
        // text-align: center;
        .label {
          color: #32effe;
          font-size: 14px;
          font-weight: 600;
        }
        .value {
          font-size: 20px;
          color: #fff;
        }
      }
    }
  }

  .rightTipBar {
    position: absolute;
    right: 3px;
    top: 5px;
    z-index: 999;
    li {
      // border: 1px solid #3ffff8;
      margin-top: 20px;
      font-size: 14px;
      cursor: pointer;
      // width: 90px;
      height: 90px;
      color: #6eddf1;
      display: flex;
      // flex-direction: column;
      align-items: center;
      border-radius: 7px;
      .labelList {
        display: flex;
        flex-direction: column;
        // text-align: center;
        .label {
          color: #32effe;
          font-size: 14px;
          font-weight: 600;
        }
        .value {
          text-align: right;
          font-size: 20px;
          color: #fff;
        }
      }
    }
  }

  .clickLi {
    // background: radial-gradient(55% 55% ellipse, rgba(7, 9, 34, 0.8) 60%, #154391);
  }

  .guideLine {
    width: 100%;
    height: 100%;
    // z-index: 9999;

    #textBox_1 {
      opacity: 0;
    }

    .title_1 {
      font-size: 15px;
      cursor: pointer;

      .title-text-box {
        background: rgba(0, 0, 0, 0);
        justify-content: center; //子元素水平居中
        align-items: center; //子元素垂直居中
        display: -webkit-flex;
        height: 100%;

        p {
          width: 100%;
          background: rgba(0, 0, 0, 0);
          color: #a0e8ff;
          font-size: 15px;
          text-align: center;

          .titleText {
            margin-left: -5px;
            font-size: 15px;
            display: block;
          }

          /deep/ .ivu-rate {
            font-size: 14px;

            .ivu-rate-star {
              margin-right: 6px;
            }
          }
        }
      }
    }

    .text {
      opacity: 0;
      color: #fff;
      font-size: 15px;
      text-align: center;

      .text-box {
        background: rgba(0, 0, 0, 0);
        justify-content: center; //子元素水平居中
        align-items: center; //子元素垂直居中
        display: -webkit-flex;

        .promptBox {
          width: 100%;
          height: 100%;
          padding: 10px 20px;

          .promptTitle {
            color: #fff;
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 5px;
          }

          p {
            background: rgba(0, 0, 0, 0);
            color: #a0e8ff;
            font-size: 16px;
            text-align: left;
          }
        }

        .psychologyContent {
          color: #afe5fb;
          font-size: 16px;
          text-align: left;

          div {
            line-height: 2em;

            span {
              &:first-child {
                color: #fed723;
                cursor: pointer;
              }
            }
          }
        }
      }
    }

    .swap1 {
      stroke-dasharray: 130;
      stroke-dashoffset: 130;
    }

    .swap2 {
      stroke-dasharray: 190;
      stroke-dashoffset: 190;
    }

    .swap3 {
      stroke-dasharray: 240;
      stroke-dashoffset: 240;
    }

    .swap4 {
      stroke-dasharray: 295;
      stroke-dashoffset: 295;
    }

    .circle-point {
      &:hover {
        fill: #000;
      }
    }

    // .swap4{
    // stroke-dasharray: 110;
    // stroke-dashoffset: 110;
    // }
  }
}
</style>
