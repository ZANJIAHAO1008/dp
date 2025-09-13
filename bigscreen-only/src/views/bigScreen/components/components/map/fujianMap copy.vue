<template>
  <div>
    <div class="mineMap">
      <div id="mapArea"></div>
    </div>
    <div class="tip" ref="tip">
      <div class="tipBox">
        <co-image
          style="width: 100px; height: 120px"
          :src="`http://172.27.0.21:8585/get/ckImg/${personInfo ? personInfo.djgzrySfzh : ''}.jpg`"
          fit="fill"
        >
          <div slot="error" class="co-image__error">
            <img src="@/images/mrtx.png" alt="" style="width: 100px; height: 120px" />
          </div>
        </co-image>

        <div class="labels-list">
          <div class="msgList">
            <span class="label">姓名：</span>

            <co-tooltip placement="topLeft">
              <template slot="title">
                <span>{{ personInfo.djgzryZwm }}</span>
              </template>
              <span class="value">{{ personInfo.djgzryZwm }}</span>
            </co-tooltip>
          </div>
          <div class="msgList">
            <span class="label">性别：</span>
            <span class="value" :title="personInfo.djgzryXb">{{ personInfo.djgzryXb }}</span>
          </div>
          <div class="msgList">
            <span class="label">身份证号：</span>
            <co-tooltip placement="topLeft">
              <template slot="title">
                <span>{{ personInfo.djgzrySfzh }}</span>
              </template>
              <span class="value">{{ personInfo.djgzrySfzh }}</span>
            </co-tooltip>
          </div>
          <div class="msgList">
            <span class="label">涉恐情况：</span>
            <co-tooltip placement="topLeft">
              <template slot="title">
                <span>{{ personInfo.djgzryZyskxyqk }}</span>
              </template>
              <span class="value">{{ personInfo.djgzryZyskxyqk }}</span>
            </co-tooltip>
          </div>
          <div class="msgList">
            <span class="label">登记日期：</span>
            <co-tooltip placement="topLeft">
              <template slot="title">
                <span>{{ personInfo.djgzryDjsx }}</span>
              </template>
              <span class="value">{{ personInfo.djgzryDjsx }}</span>
            </co-tooltip>
          </div>
          <div class="msgList">
            <span class="label">控制级别：</span>
            <span class="value" :title="personInfo.djgzryKzjb">{{ personInfo.djgzryKzjb }}</span>
          </div>
          <div class="msgList">
            <span class="label">当前地址：</span>
            <co-tooltip placement="topLeft">
              <template slot="title">
                <span>{{ personInfo.djgzryZzd }}</span>
              </template>
              <span class="value">{{ personInfo.djgzryZzd }}</span>
            </co-tooltip>
          </div>
        </div>
      </div>
    </div>

    <div class="personInfo-modal" v-if="showModal">
      <div class="personInfo-modal-nav">
        <span class="personInfo-modal-title"> {{title}}信息 </span>
        <img
          @click="showModal = false;"
          style="width: 17px; height: 17px; cursor: pointer"
          src="@/images/bigscreen/u14741.png"
          alt=""
        />
      </div>
      <div class="personInfo-modal-info">
        <div class="img-box">
          <img :src="`http://172.27.0.21:8585/get/ckImg/${personInfo.djgzrySfzh}.jpg`" alt="加载失败" />
          <div class="ryda-btn" @click="routeToDa(personInfo)">人员档案</div>
        </div>

        <div class="labels-list">
          <div class="msgList">
            <span class="label">姓名：</span>

            <co-tooltip placement="topLeft">
              <template slot="title">
                <span>{{ personInfo.djgzryZwm }}</span>
              </template>
              <span class="value">{{ personInfo.djgzryZwm }}</span>
            </co-tooltip>
          </div>
          <div class="msgList">
            <span class="label">性别：</span>
            <span class="value" :title="personInfo.djgzryXb">{{ personInfo.djgzryXb }}</span>
          </div>
          <div class="msgList">
            <span class="label">身份证号：</span>
            <co-tooltip placement="topLeft">
              <template slot="title">
                <span>{{ personInfo.djgzrySfzh }}</span>
              </template>
              <span class="value">{{ personInfo.djgzrySfzh }}</span>
            </co-tooltip>
          </div>
          <div class="msgList">
            <span class="label">涉恐情况：</span>
            <co-tooltip placement="topLeft">
              <template slot="title">
                <span>{{ personInfo.djgzryZyskxyqk }}</span>
              </template>
              <span class="value">{{ personInfo.djgzryZyskxyqk }}</span>
            </co-tooltip>
          </div>
          <div class="msgList">
            <span class="label">登记日期：</span>
            <co-tooltip placement="topLeft">
              <template slot="title">
                <span>{{ personInfo.djgzryDjsx }}</span>
              </template>
              <span class="value">{{ personInfo.djgzryDjsx }}</span>
            </co-tooltip>
          </div>
          <div class="msgList">
            <span class="label">控制级别：</span>
            <span class="value" :title="personInfo.djgzryKzjb">{{ personInfo.djgzryKzjb }}</span>
          </div>
          <div class="msgList">
            <span class="label">当前地址：</span>
            <co-tooltip placement="topLeft">
              <template slot="title">
                <span>{{ personInfo.djgzryZzd }}</span>
              </template>
              <span class="value">{{ personInfo.djgzryZzd }}</span>
            </co-tooltip>
          </div>
        </div>
      </div>
      <!-- <div>
        <div class="gjmx-button-group">
          <co-range-picker
            size="small"
            class="myCoPicker"
            valueFormat="YYYY-MM-DD HH:mm:ss"
            :showTime="{ format: 'HH:mm' }"
            format="YYYY-MM-DD HH:mm:ss"
            :placeholder="['开始时间', '结束时间']"
            @change="
              e => {
                date = e;
              }
            "
            style="width: 235px"
          />
          <co-button type="primary" size="small" @click="checkAdress">查询</co-button>
        </div>
        <co-radio-group
          style="padding-top: 8px"
          name="radioGroup"
          v-model="chooseGj"
          @change="
            e => {
              chooseGj = e.target.value;
            }
          "
        >
          <co-row>
            <co-col :span="8" v-for="(item, index) in gjlbList" :key="`person${index}`"
              ><co-radio :value="item">{{ item }}</co-radio>
            </co-col>
          </co-row>
        </co-radio-group>

        <div v-if="detailList.length" class="lineItem">
          <co-timeline v-for="(item, index) in detailList" :key="index">
            <co-timeline-item :key="`ksd${index}`" color="rgba(56, 127, 245, 1)">
              <span class="time">{{ item.kssj_dt }}</span>
              <span class="txt"
                ><span class="dz">{{ item.ksd_xxdz ? item.ksd_xxdz : '暂无位置信息' }}</span>
              </span>
            </co-timeline-item>
          </co-timeline>
        </div>
        <co-empty v-else style="color: #fff; padding-top: 40px" />
      </div> -->
    </div>

     <div class="personInfo-modal-box" v-show="showModal"></div>
  </div>
</template>
<script>
import { fujianMap } from '@/libs/fujianmap.js';
import * as echarts from 'echarts';
export default {
  props: ['type', 'list','title'],
  data() {
    return {
      chart: null,
      fujianMap,
      personInfo: {},
      showModal:false
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  beforeDestroy() {
    this.clearChart(); // 在组件销毁前清除和销毁图表实例
  },
  methods: {
    routeToDa(personInfo){
       window.open(`http://172.27.2.28:9999/jbxxb?zjhm=${personInfo.djgzrySfzh}`);
    },
    clearChart() {
      if (this.chart) {
        this.chart.clear(); // 清除图表的数据和组件
        this.chart.dispose(); // 销毁图表实例
      }
    },
    initChart() {
      this.clearChart();
      this.chart = this.$echarts(document.getElementById('mapArea'));
      echarts.registerMap('fujian', this.fujianMap);
      let option = {
        geo: [
          {
            map: 'fujian',
            aspectScale: 1,
            zoom: 0.55, // 缩放
            layoutCenter: ['50%', '50%'],
            layoutSize: '180%',
            show: true,
            roam: false,
            label: {
              show: true,
              // emphasis: {
              //   show: false,
              // },
              color: '#fff',
            },
            itemStyle: {
              normal: {
                borderColor: '#3ffff8',
                borderWidth: 1,
                // shadowColor: '#8cd3ef',
                // shadowOffsetY: 10,
                // shadowBlur: 120,
                areaColor: 'transparent',
              },
            },
          },
          // {
          //   type: 'map',
          //   map: 'fujian',
          //   zlevel: -2,
          //   aspectScale: 1,
          //   zoom: 0.52, // 缩放
          //   layoutCenter: ['50%', '52%'],
          //   layoutSize: '180%',
          //   roam: false,
          //   silent: true,
          //   itemStyle: {
          //     normal: {
          //       borderWidth: 1,
          //       // borderColor: "rgba(11, 43, 97,0.8)",
          //       borderColor: '#3ffff8',
          //       shadowColor: 'rgba(58,149,253,1)',
          //       shadowOffsetY: 15,
          //       shadowBlur: 10,
          //       areaColor: 'rgba(11, 43, 97,0.4)',
          //     },
          //   },
          // },
        ],
        series: [
          {
            type: 'effectScatter',
            coordinateSystem: 'geo',
            symbolSize: 6,
            data: [
              // {
              //   // name: 'Fuzhou',
              //   value: [119.2965, 26.0745],
              //   djgzryZwm: '测试姓名',
              //   djgzryXb: '男',
              //   djgzrySfzh: '320681199610188716',
              //   djgzryZyskxyqk: '涉恐情况',
              //   djgzryDjsx: '2024年12月30日',
              //   djgzryKzjb: '一级',
              //   djgzryZzd: '测试地址测试地址测试地址测试地址',
              // },
              // {
              //   // name: 'Xiamen',
              //   value: [118.1102, 24.4907],
              //   djgzryZwm: '测试姓名2',
              //   djgzryXb: '男',
              //   djgzrySfzh: '320681199610188716',
              //   djgzryZyskxyqk: '涉恐情况',
              //   djgzryDjsx: '2024年12月30日',
              //   djgzryKzjb: '一级',
              //   djgzryZzd: '测试地址测试地址测试地址测试地址',
              // },
              // Add more points as needed
              ...this.list,
            ],
            itemStyle: {
              color: '#f00', // Color of the points
            },
            tooltip: {
              trigger: 'item',
              formatter: function (params) {
                return `${params.name}: ${params.data.info}`;
              },
            },
          },
        ],
      };
      this.chart.setOption(option);

      // Custom mouseover and mouseout events
      this.chart.on('mouseover', params => {
        if (params.componentType === 'series' && params.seriesType === 'effectScatter') {
          this.handleMouseOver(params);
        }
      });
      this.chart.on('mouseout', params => {
        if (params.componentType === 'series' && params.seriesType === 'effectScatter') {
          this.handleMouseOut();
        }
      });
      this.chart.getZr().on('mousemove', this.handleMouseMove);

      this.chart.on('click', 'series.effectScatter', params => {
        let info = params.data;
        this.personInfo = info;
        this.showModal = true;
      });
    },
    handleMouseOver(params) {
      this.personInfo = params.data;
      console.log(params, 'params');
      const tip = this.$refs.tip;
      tip.style.display = 'block';
      // tip.innerHTML = `${params.name}: ${params.data.info}`;
    },
    handleMouseOut() {
      const tip = this.$refs.tip;
      tip.style.display = 'none';
    },
    handleMouseMove(event) {
      const tip = this.$refs.tip;
      tip.style.left = `${event.offsetX + 10}px`;
      tip.style.top = `${event.offsetY + 10}px`;
    },
  },
};
</script>
<style lang="less" scoped>
.mineMap {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 1px;
  // z-index: 999;
  #mapArea {
    width: 100%;
    height: 100%;
  }
}
.tip {
  display: none;
  position: absolute;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 10px;
  width: 400px;
  height: 230px;
  border-radius: 3px;
  pointer-events: none;
  white-space: nowrap;
  z-index: 1000;
  border: 1px solid #3ffff8;

  .tipBox {
    display: flex;
  }

  .labels-list {
    margin-bottom: 3px;
    margin-left: 10px;
    .msgList {
      display: flex;
      margin-bottom: 10px;
      .label {
        color: #abe6fa;
        width: 75px;
        text-align: right;
        font-size: 14px;
      }
      .value {
        color: #fff;
        width: 160px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
  .personInfo-modal-box {
    position: fixed;
    left: 0px;
    top: 0px;
    width: 10000px;
    height: 10000px;
    background-color: rgb(0, 0, 0);
    opacity: 0.838627;
    z-index: 1046;
  }
  .personInfo-modal {
    position: absolute;
    right: 1%;
    top: 5%;
    background-image: url('@/images/bigscreen/u14738.png');
    background-size: 100% 100%;
    width: 420px;
    height: 700px;
    z-index: 99999;
    padding: 57px 46px;
    &-nav {
      display: flex;
      justify-content: space-between;
    }
    &-title {
      color: #32effe;
      font-weight: 600;
      font-size: 16px;
    }
    .img-box {
      text-align: center;
      .ryda-btn {
        height: 28px;
        line-height: 28px;
        width: 100%;
        background: #f76c4d;
        color: #fff;
        border-radius: 4px;
        cursor: pointer;
        margin-top: 6px;
      }
    }
    &-info {
      display: flex;
      padding: 10px;
      img {
        background-image: url('@/images/mrtx.png');
        background-size: 100% 100%;
        width: 95px;
        height: 112px;
      }
      .labels-list {
        margin-bottom: 3px;
      }
      .msgList {
        display: flex;
        .label {
          color: #abe6fa;
          width: 75px;
          text-align: right;
        }
        .value {
          color: #fff;
          width: 115px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }

    .co-radio-wrapper {
      color: #abe6fa !important;
    }
    .co-timeline-item {
      padding: 0 0 6px !important;
      color: #32effe;
    }
    .lineItem {
      height: 290px;
      overflow: auto;
    }
  }
</style>
