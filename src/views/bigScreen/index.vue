<template>
  <div class="page1">
    <Row class="listTop">
      <Col span="7">
        <div class="leftTop1">
          <dpTitle title="预警及任务处置" :isSelect="false"></dpTitle>
          <span class="angle1"></span>
          <span class="angle2"></span>
          <span class="angle3"></span>
          <span class="angle4"></span>
          <dbrw></dbrw>
        </div>
        <div class="leftTop2">
          <div class="lrlctj">
            <!-- <span class="title"><span class="title-gradient">流入流出统计</span></span> -->
            <dpTitle
              title="流入流出统计"
              @changeDate="changeDateLrlc"
              select="8"
              :dateList="[
                { title: '近7天', value: '8' },
                { title: '近30天', value: '7' },
                { title: '近1年', value: '6' },
              ]"
            ></dpTitle>
            <span class="angle1"></span>
            <span class="angle2"></span>
            <span class="angle3"></span>
            <span class="angle4"></span>
            <lrlctj :selectRangeDate="selectRangeDate" ref="lrlctj"></lrlctj>
          </div>
        </div>
      </Col>
      <Col span="10">
        <center ref="chart6"></center>
      </Col>
      <Col span="7">
        <div class="rightTop-1">
          <dpTitle title="情报录入处置统计" @changeDate="changeDateQblr"></dpTitle>

          <span class="angle1"></span>
          <span class="angle2"></span>
          <span class="angle3"></span>
          <span class="angle4"></span>
          <qblrcz ref="qblr" :select-range-date="selectRangeDate" :data="colorsData"></qblrcz>
        </div>
        <div class="rightTop-2">
          <dpTitle title="首次再次流入" @changeDate="changeDateSczclc" :isSelect="false"></dpTitle>
          <span class="angle1"></span>
          <span class="angle2"></span>
          <span class="angle3"></span>
          <span class="angle4"></span>
          <sczclc ref="sczclc" :select-range-date="selectRangeDate"></sczclc>
          <!-- <div class="rightTop-list">
            <div class="list">
              <chart3 ref="chart8"></chart3>
            </div>
            <div class="list">
              <chart4 ref="chart9" :data="data5"></chart4>
            </div>
            <div class="list">
              <chart4 ref="chart10" :data="data6"></chart4>
            </div>
          </div> -->
        </div>
      </Col>
    </Row>
    <Row class="listBottom">
      <Col span="9">
        <div class="content">
          <dpTitle  @changeDate="changeDateHczl" title="核查指令统计"></dpTitle>
          <span class="angle1"></span>
          <span class="angle2"></span>
          <span class="angle3"></span>
          <span class="angle4"></span>
          <hczl ref="hczl" :data="colorsData"></hczl>
          <!-- <Row class="topLine">
            <Col span="24">
              <chart5 ref="chart11"></chart5>
            </Col>
          </Row>
          <Row class="bottomPie">
            <Col span="12">
              <chart6 ref="chart12" :data="data7"></chart6>
            </Col>
            <Col span="12">
              <chart6 ref="chart13" :data="data8"></chart6>
            </Col>
          </Row> -->
        </div>
      </Col>
      <Col span="4">
        <div class="content">
          <dpTitle title="交通情况" :isSelect="false"></dpTitle>
          <span class="angle1"></span>
          <span class="angle2"></span>
          <span class="angle3"></span>
          <span class="angle4"></span>
          <div class="behavior">
            <djChart style="height: 52%" :select-range-date="selectRangeDate" :config="configData9"></djChart>
            <slChart style="height: 45%" :select-range-date="selectRangeDate" :config="configData9"></slChart>
          </div>
          <!-- <div class="behavior">
            <djChart style="height: 55%" :select-range-date="selectRangeDate" :config="configData9"></djChart>
          </div> -->

          <!-- <djChart></djChart> -->
        </div>
      </Col>
      <Col span="4">
        <div class="content">
          <span class="angle1"></span>
          <span class="angle2"></span>
          <span class="angle3"></span>
          <span class="angle4"></span>
          <dpTitle title="人员年龄/性别统计" :isSelect="false"></dpTitle>
          <!-- <chart8 ref="chart16"></chart8> -->
          <nnbl style="height: 52%"></nnbl>
          <nlbl style="height: 45%"></nlbl>
        </div>
      </Col>
      <Col span="7">
        <div class="content">
          <dpTitle title="计划流入流出"  :isSelect="false"  @changeDate="changeDateJhlrlc"></dpTitle>
          <span class="angle1"></span>
          <span class="angle2"></span>
          <span class="angle3"></span>
          <span class="angle4"></span>
          <jhlrlc ref="jhlrlc"></jhlrlc>
          <!-- <div class="appUse">
            <chart9 ref="chart17"></chart9>
          </div> -->
        </div>
      </Col>
    </Row>
    <Row class="listBottom" style="margin-top: 20px;">
      <Col span="12">
        <div class="content">
          <dpTitle title="车辆预警统计" :isSelect="false"></dpTitle>
          <span class="angle1"></span>
          <span class="angle2"></span>
          <span class="angle3"></span>
          <span class="angle4"></span>
          <clyj ref="clyj"></clyj>
        </div>
      </Col>
      <Col span="12">
        <div class="content">
          <dpTitle title="籍贯统计" :isSelect="false"></dpTitle>
          <span class="angle1"></span>
          <span class="angle2"></span>
          <span class="angle3"></span>
          <span class="angle4"></span>
          <jgtj ref="jgtj"></jgtj>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script>
import Jhlrlc from './components/jhlrlc.vue';
import Qblrcz from './components/qblrcz.vue';
import slChart from './components/sl';
import djChart from './components/djclfl';
const sczclc = () => import('./components/sczclc.vue');
const lrlctj = () => import('./components/lrlctj');
const chart2 = () => import('./components/chart2');
// const chart4 = () => import('./components/chart4');
// const chart3 = () => import('./components/chart3');
const chart5 = () => import('./components/chart5');
const chart6 = () => import('./components/chart6');
const hczl = () => import('./components/hczl.vue');
const chart8 = () => import('./components/chart8');
const chart9 = () => import('./components/chart9');
const areaChart = () => import('./components/areaChart');
const pie = () => import('./components/pie');
const center = () => import('./components/center');
const dbrw = () => import('./components/dbrw.vue');
const nnbl = () => import('./components/components/nlxb/nnbl.vue');
const nlbl = () => import('./components/components/nlxb/nlbl.vue');
const clyj = () => import('./components/clyj.vue');
const jgtj = () => import('./components/jgtj.vue');
import dpTitle from '@/components/dpTitle';
export default {
  name: 'bigScreen',
  props: {
    selectRangeDate: Array,
  },
  components: {
    slChart,
    djChart,
    dbrw, //待办任务
    lrlctj, // 流入流出统计
    nnbl,
    center, // 中心
    chart2, // 柱图
    pie, // 饼图
    // chart4, // 圆环
    // chart3, // 柱图
    chart5, //折线图
    chart6, // 饼环图
    hczl, // 柱图
    chart8, // 漏斗图
    chart9, //柱图
    areaChart, // 面积图
    nlbl,
    Qblrcz,
    sczclc,
    Jhlrlc,
    clyj, // 车辆预警
    jgtj, // 籍贯统计
    dpTitle,
  },
  computed: {
    spinning() {
      let flag = false;

      // if (window.configOut?.showBigScreen) {
      //   flag = false;
      // } else {
      //   if (new Date().getMonth() + 1 < '6') {
      //     flag = false;
      //   }
      // }
      return flag;
    },
  },
  data() {
    return {
      data1: {
        // 柱图数据1
        name: '柱图数据1',
        number: '100次',
        data: ['排行1', '排行2', '排行3', '排行4', '排行5'],
        color: '192,35,42',
        value: [60, 50, 40, 30, 20],
      },
      data2: {
        // 饼图数据1
        title: '饼图数据1分类占比',
        color: '#BE232A',

        data: [
          {
            value: 60,
            name: '分类1',
            itemStyle: {
              color: '#a262f2',
            },
          },
          {
            value: 20,
            name: '分类2',
            itemStyle: {
              color: '#2ca8fe',
            },
          },
          {
            value: 80,
            name: '分类3',
            itemStyle: {
              color: '#feac2c',
            },
          },
          {
            value: 40,
            name: '分类4',
            itemStyle: {
              color: '#c0232a',
            },
          },
          {
            value: 40,
            name: '分类5',
            itemStyle: {
              color: '#2cd9fe',
            },
          },
          {
            value: 40,
            name: '分类6',
            itemStyle: {
              color: '#ff787e',
            },
          },
          {
            value: 30,
            name: '其他',
            itemStyle: {
              color: '#252448',
            },
          },
        ],
      },
      data3: {
        // 柱图数据2
        name: '柱图数据2',
        number: '100次',
        data: ['排行1', '排行2', '排行3', '排行4', '排行5'],
        color: '40,112,232',
        value: [6, 5, 4, 3, 2],
      },
      // 饼图数据2
      data4: {
        title: '饼图数据2分类占比',
        color: '#2C7BFE',
        data: [
          {
            value: 20,
            name: '分类1',
            itemStyle: {
              color: '#feed2c',
            },
          },
          {
            value: 20,
            name: '分类2',
            itemStyle: {
              color: '#2ca8fe',
            },
          },
          {
            value: 40,
            name: '分类3',
            itemStyle: {
              color: '#feac2c',
            },
          },
          {
            value: 40,
            name: '分类4',
            itemStyle: {
              color: '#2c7bfe',
            },
          },
          {
            value: 100,
            name: '其他',
            itemStyle: {
              color: '#252448',
            },
          },
        ],
      },
      // 环形图数据
      data5: {
        title: '环形图数据1',
        data: [
          {
            value: 335,
            name: '模拟1',
            itemStyle: {
              color: '#252448',
            },
          },
          {
            value: 310,
            name: '模拟2',
            itemStyle: {
              color: '#2ca8fe',
            },
          },
          {
            value: 234,
            name: '模拟3',
            itemStyle: {
              color: '#feed2c',
            },
          },
          {
            value: 135,
            name: '其他',
            itemStyle: {
              color: '#2871ea',
            },
          },
          {
            value: 200,
            name: '模拟4',
            itemStyle: {
              color: '#fe672c',
            },
          },
        ],
      },
      // 环形数据2
      data6: {
        title: '环形数据2',
        data: [
          {
            value: 335,
            name: '模拟1',
            itemStyle: {
              color: '#69f262',
            },
          },
          {
            value: 310,
            name: '模拟2',
            itemStyle: {
              color: '#c0232a',
            },
          },
          {
            value: 234,
            name: '模拟3',
            itemStyle: {
              color: '#2cfcfe',
            },
          },
          {
            value: 135,
            name: '其他',
            itemStyle: {
              color: '#252448',
            },
          },
          {
            value: 200,
            name: '模拟4',
            itemStyle: {
              color: '#a262f2',
            },
          },
        ],
      },
      // 模块二数据
      data7: {
        title: '标题',
        data: [
          {
            value: 70,
            name: '数据1',
            itemStyle: {
              color: '#c0232a',
            },
          },
          {
            value: 60,
            name: '数据2',
            itemStyle: {
              color: '#2870e8',
            },
          },
        ],
        data1: [
          {
            value: 40,
            name: '方式1',
            itemStyle: {
              color: '#c0232a',
            },
          },
          {
            value: 60,
            name: '方式2',
            itemStyle: {
              color: '#2870e8',
            },
          },
        ],
      },
      // 模块二数据
      data8: {
        title: '标题',
        data: [
          {
            value: 80,
            name: '数据1',
            itemStyle: {
              color: '#c0232a',
            },
          },
          {
            value: 60,
            name: '数据2',
            itemStyle: {
              color: '#2870e8',
            },
          },
        ],
        data1: [
          {
            value: 40,
            name: '方式1',
            itemStyle: {
              color: '#c2232a',
            },
          },
          {
            value: 60,
            name: '方式2',
            itemStyle: {
              color: '#fe672c',
            },
          },
          {
            value: 40,
            name: '方式3',
            itemStyle: {
              color: '#a262f2',
            },
          },
          {
            value: 20,
            name: '方式4',
            itemStyle: {
              color: '#2870e8',
            },
          },
          {
            value: 80,
            name: '方式5',
            itemStyle: {
              color: '#feed2c',
            },
          },
        ],
      },
      // 模块三面积图
      configData9: {
        title: '【标题】',
        color: '#75deef',
        name: ['（人）', '（人）'],
        data: [
          {
            name: '数据1',
            color: ['#feed2c', '#353103'],
            data: [240, 132, 101, 134, 90, 170, 110],
          },
          {
            name: '数据2',
            color: ['#2871ea', '#0a1b41'],
            data: [20, 102, 101, 134, 190, 150, 120],
          },
          {
            name: '数据3',
            color: ['#935adf', '#230f3e'],
            data: [100, 32, 101, 134, 150, 110, 180],
          },
          {
            name: '数据4',
            color: ['#e65f2d', '#551f0b'],
            data: [120, 122, 141, 144, 60, 220, 120],
          },
        ],
      },
      // 模块三柱图
      colorsData: [
        {
          itemStyle: {
            color: '#2c7bfe',
          },
          name: '数据1',
          value: 255,
        },
        {
          itemStyle: {
            color: '#c2232a',
          },
          name: '数据2',
          value: 212,
        },
        {
          itemStyle: {
            color: '#feed2c',
          },
          name: '数据3',
          value: 155,
        },
        {
          itemStyle: {
            color: '#a262f2',
          },
          name: '数据4',
          value: 55,
        },
        {
          itemStyle: {
            color: '#62d5f2',
          },
          name: '数据5',
          value: 80,
        },
        {
          itemStyle: {
            color: '#fe672c',
          },
          name: '数据6',
          value: 160,
        },
        {
          itemStyle: {
            color: '#69f262',
          },
          name: '数据7',
          value: 114,
        },
        {
          itemStyle: {
            color: '#2ca8fe',
          },
          name: '数据8',
          value: 20,
        },
      ],
      resizeFn: null,
    };
  },
  methods: {
    changeDateLrlc(type) {
      this.$refs.lrlctj.lrlcQst(type);
    },
    changeDateHczl(type) {
      this.$refs.hczl.getZl(type);
    },
    changeDateQblr(type) {
      this.$refs.qblr.getQb(type);
    },
    changeDateSczclc(type) {
      this.$refs.sczclc.sczclc(type);
    },
    changeDateJhlrlc(type) {
      this.$refs.jhlrlc.lrlcQst(type);
    },
  },
  watch: {
    selectRangeDate: function () {
      for (let i = 1; i < 18; i++) {
        this.$refs['chart' + i].setChart();
      }
    },
  },
  mounted() {
    this.resizeFn = this.$debounce(() => {
      // 通过捕获系统的onresize事件触发我们需要执行的事件
      for (let i = 1; i < 18; i++) {
        this.$refs['chart' + i].setChart();
      }
    }, 500);
    window.addEventListener('resize', this.resizeFn);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeFn);
  },
};
</script>

<style lang="less">
.page1 {
  height: 100%;
  width: 100%;
  padding: 14px 20px 20px;
  background: #03044a;
  overflow: hidden;

  .listTop {
    height: 60%;

    .ivu-col {
      height: 100%;

      .leftTop1 {
        width: 100%;
        height: 55%;
        border: 1px solid #0d2451;
        position: relative;
      }
      .leftTop2 {
        width: 100%;
        margin-top: 5%;
        height: 40%;
        border: 1px solid #0d2451;
        position: relative;

        .lrlctj {
          width: 100%;
          height: 100%;
        }
      }

      .rightTop-1 {
        width: 100%;
        height: 55%;
        border: 1px solid #0d2451;
        position: relative;
      }

      .rightTop-2 {
        width: 100%;
        margin-top: 5%;
        height: 40%;
        border: 1px solid #0d2451;
        position: relative;

        .rightTop-list {
          width: 100%;
          height: 100%;

          .list {
            width: 30%;
            height: 100%;
            float: left;

            &:first-child {
              width: 40%;
            }
          }
        }
      }
    }
  }

  .listBottom {
    height: 40%;

    .ivu-col-span-9 {
      width: 33.5%;
      margin-right: 0.6667%;
    }

    .ivu-col-span-4 {
      width: 17.66667%;
      margin-right: 0.6667%;
    }

    .ivu-col {
      height: 100%;

      .content {
        margin-top: 30px;
        height: calc(~'100% - 30px');
        border: 1px solid #0d2451;
        position: relative;

        .ivu-row {
          &.topLine {
            height: 55%;
          }

          &.bottomPie {
            height: 45%;
          }

          .ivu-col {
            height: 100%;

            .charts-list {
              height: 100%;
              width: 100%;
            }
          }
        }

        .behavior {
          width: 100%;
          height: 100%;
        }

        .appUse {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
