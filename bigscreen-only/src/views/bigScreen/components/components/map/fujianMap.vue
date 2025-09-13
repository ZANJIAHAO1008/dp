<template>
  <div class="fujianmineMap">
    <div id="mapAreafujian"></div>
    <div class="mapTip">
      <transition-group name="list-complete" tag="div">
        <li class="list-li" v-for="(item, idx) in chinaDatas11" :key="idx">
          <span class="ml20">
            <span class="dz">{{ item[0].name }}</span>
          </span>
          <span class="rs">【{{ item[0].type }}】- {{ item[0].value }}人</span>
        </li>
      </transition-group>
    </div>
  </div>
</template>
<script>
import { fujianMap } from '@/libs/fujianmap.js';
// import { chinamap } from '@/libs/chinamap';
import * as echarts from 'echarts';
export default {
  props: ['list'],
  data() {
    return {
      chinaGeoCoordMap: {
        福州市: [119.306239, 26.075302],
        厦门市: [118.11022, 24.490474],
        莆田市: [119.007558, 25.431011],
        三明市: [117.635001, 26.265444],
        泉州市: [118.589421, 24.908853],
        漳州市: [117.661801, 24.510897],
        南平市: [118.178459, 26.635627],
        龙岩市: [117.02978, 25.091603],
        宁德市: [119.527082, 26.65924],
      },
      chinaDatas: [
        // [
        //   {
        //     name: '黑龙江',
        //     value: 5,
        //   },
        // ],
        // [
        //   {
        //     name: '内蒙古',
        //     value: 3,
        //   },
        // ],
        // [
        //   {
        //     name: '北京市',
        //     value: 20,
        //   },
        // ],
        // [
        //   {
        //     name: '吉林',
        //     value: 3,
        //   },
        // ],
        // [
        //   {
        //     name: '辽宁',
        //     value: 5,
        //   },
        // ],
        // [
        //   {
        //     name: '河北',
        //     value: 6,
        //   },
        // ],
        // [
        //   {
        //     name: '天津',
        //     value: 5,
        //   },
        // ],
        // [
        //   {
        //     name: '山西',
        //     value: 7,
        //   },
        // ],
        // [
        //   {
        //     name: '陕西',
        //     value: 6,
        //   },
        // ],
        // [
        //   {
        //     name: '甘肃',
        //     value: 5,
        //   },
        // ],
        // [
        //   {
        //     name: '宁夏',
        //     value: 5,
        //   },
        // ],
        // [
        //   {
        //     name: '青海',
        //     value: 7,
        //   },
        // ],
        // [
        //   {
        //     name: '新疆',
        //     value: 3,
        //   },
        // ],
        // [
        //   {
        //     name: '西藏',
        //     value: 3,
        //   },
        // ],
        // [
        //   {
        //     name: '四川',
        //     value: 10,
        //   },
        // ],
        // [
        //   {
        //     name: '重庆',
        //     value: 9,
        //   },
        // ],
        // [
        //   {
        //     name: '广东',
        //     value: 10,
        //   },
        // ],
        // [
        //   {
        //     name: '山东',
        //     value: 6,
        //   },
        // ],
        // [
        //   {
        //     name: '河南',
        //     value: 8,
        //   },
        // ],
        // [
        //   {
        //     name: '江苏',
        //     value: 10,
        //   },
        // ],
        // [
        //   {
        //     name: '安徽',
        //     value: 9,
        //   },
        // ],
        // [
        //   {
        //     name: '湖北',
        //     value: 10,
        //   },
        // ],
        // [
        //   {
        //     name: '浙江',
        //     value: 16,
        //   },
        // ],
        // [
        //   {
        //     name: '福建',
        //     value: 9,
        //   },
        // ],
        // [
        //   {
        //     name: '湖南',
        //     value: 14,
        //   },
        // ],
        // [
        //   {
        //     name: '贵州',
        //     value: 8,
        //   },
        // ],
        // [
        //   {
        //     name: '广西',
        //     value: 7,
        //   },
        // ],
        // [
        //   {
        //     name: '海南',
        //     value: 7,
        //   },
        // ],
        // [
        //   {
        //     name: '上海',
        //     value: 17,
        //   },
        // ],
      ],
      series: [],
      chart: null,
      fujianMap,
      chinaDatas11: [],
      timer: null,
      removeitem: null,
      // chinamap
    };
  },
  mounted() {
    this.getSeries();
    this.$nextTick(() => {
      this.initChart();
    });
  },
  created() {},
  methods: {
    clearTime() {
      if (!this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    add: function () {
      if (this.chinaDatas11 && this.chinaDatas11.length) {
        const item = { ...this.removeitem[0] };
        this.chinaDatas11.push(item);
      }
    },
    remove: function () {
      this.removeitem = this.chinaDatas11.splice(0, 1);
    },
    // 格式化数据
    convertData(data) {
      var res = [];
      for (var i = 0; i < data.length; i++) {
        var dataItem = data[i];
        var fromCoord = this.chinaGeoCoordMap[dataItem[0].name];
        var toCoord = [117.661801, 24.510897];
        if (fromCoord && toCoord) {
          res.push([
            {
              coord: toCoord,
              value: dataItem[0].value,
            },
            {
              coord: fromCoord,
            },
          ]);
        }
      }
      return res;
    },
    // 获取series
    getSeries() {
      if (this.list) {
        this.chinaDatas = [...this.list];
        this.chinaDatas11 = [...this.chinaDatas];

        let that = this;

        if (!that.timer) {
          that.timer = setInterval(() => {
            if (that.chinaDatas11.length > 1) {
              that.remove();
              that.$nextTick().then(() => {
                that.add();
              });
            }
          }, 2000);
        }
      }

      [['漳州市', this.chinaDatas]].forEach((item, i) => {
        
        this.series.push(
          {
            type: 'lines',
            zlevel: 1,
            effect: {
              show: true,
              period: 4, //箭头指向速度，值越小速度越快
              trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
              symbol: 'arrow', //箭头图标
              symbolSize: 13, //图标大小
            },
            lineStyle: {
              normal: {
                width: 1, //尾迹线条宽度
                opacity: 1, //尾迹线条透明度
                curveness: 0.3, //尾迹线条曲直度
              },
            },
            data: this.convertData(item[1]),
          },
          {
            type: 'effectScatter',
            coordinateSystem: 'geo',
            zlevel: 2,
            rippleEffect: {
              //涟漪特效
              period: 1, //动画时间，值越小速度越快
              brushType: 'stroke', //波纹绘制方式 stroke, fill
              scale: 1, //波纹圆环最大限制，值越大波纹越大
            },
            label: {
              normal: {
                show: true,
                position: 'right', //显示位置
                offset: [5, 0], //偏移设置
                formatter: function (params) {
                  //圆环显示文字
                  return params.data.name;
                },
                fontSize: 10,
              },
              emphasis: {
                show: true,
              },
            },
            symbol: 'circle',
            symbolSize: function (val) {
              return 3 + val[2] * 1; //圆环大小
            },
            itemStyle: {
              normal: {
                show: false,
                color: '#FFA54F',
              },
            },
            data: item[1].map(dataItem => {
              return {
                name: dataItem[0].name,
                value: this.chinaGeoCoordMap[dataItem[0].name].concat([dataItem[0].value]),
              };
            }),
          },
          //被攻击点
          {
            type: 'scatter',
            coordinateSystem: 'geo',
            zlevel: 2,
            rippleEffect: {
              period: 4,
              brushType: 'stroke',
              scale: 4,
            },
            label: {
              normal: {
                show: true,
                position: 'right',
                //offset:[5, 0],
                color: '#0f0',
                formatter: '{b}',
                textStyle: {
                  color: '#0f0',
                },
              },
              emphasis: {
                show: true,
                color: '#FFA54F',
              },
            },
            symbol: 'pin',
            symbolSize: 50,
            data: [
              {
                name: item[0],
                value: this.chinaGeoCoordMap[item[0]].concat([10]),
              },
            ],
          }
        );
      });

      console.log(this.series,'this.series')
    },
    initChart() {
      this.chart = this.$echarts(document.getElementById('mapAreafujian'));
      echarts.registerMap('fujian', this.fujianMap);
      let option = {
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(166, 200, 76, 0.82)',
          borderColor: '#FFFFCC',
          showDelay: 0,
          hideDelay: 0,
          enterable: true,
          transitionDuration: 0,
          extraCssText: 'z-index:100',
          formatter: function (params, ticket, callback) {
            //根据业务自己拓展要显示的内容
            var res = '';
            var name = params.name;
            var value = params.value[params.seriesIndex + 1];
            res = "<span style='color:#fff;'>" + name + '</span><br/>数据：' + value;
            return res;
          },
        },
        // backgroundColor: '#13297B',
        visualMap: {
          //图例值控制
          min: 1,
          max: 30,
          calculable: true,
          show: false,
          color: ['#f44336', '#fc9700', '#ffde00', '#ffde00', '#00eaff'],
          textStyle: {
            color: '#fff',
          },
        },
        geo: {
          map: 'fujian',
          zoom: 1.2,
          label: {
            emphasis: {
              show: false,
            },
          },
          roam: false, //是否允许缩放
          itemStyle: {
            normal: {
              color: '#13297B', //地图背景色
              borderColor: '#00fcff', //省市边界线00fcff 516a89
              borderWidth: 1,
              // opacity: 1
            },
            emphasis: {
              color: '#13297B', //悬浮背景
            },
          },
        },
        series: this.series,
      };
      this.chart.setOption(option);

      // 添加地图点击事件，点击后暂停循环5分钟
      this.chart.on('click', () => {
        this.$emit('map-clicked');
      });
    },
  },
};
</script>
<style lang="less" scoped>
.fujianmineMap {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 1px;
  #mapAreafujian {
    width: 100%;
    height: 100%;
  }
  .mapTip {
    position: absolute;
    bottom: 5%;
    right: 2%;
    height: 120px;
    overflow: hidden;
    .list-li {
      // border-bottom: 1px dashed #fefefe;
      display: flex;
      align-items: center;
      margin-bottom: 3px;
      .ml20 {
        color: #3ffff8;
        margin-left: 10px;
      }
    }

    .itemIndex {
      border: 1px solid transparent;
      border-radius: 50%;
      // padding: 2px 5px;
      color: #fff;
      height: 20px;
      line-height: 20px;
      width: 20px;
      text-align: center;
    }
    .rs {
      color: yellow;
      padding-left: 8px;
      font-size: 14px;
    }
  }
}
</style>
