<template>
  <div class="nnbl">
    <ul>
      <li>
        <span>
          <img style="width: 26px; height: 46px" src="@/images/nan.png" alt="" />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <img style="width: 26px; height: 46px" src="@/images/nv.png" alt="" />
        </span>
        <br />
        <span class="bl">
          <span class="nan">{{ nanbfb }}%</span>
          :
          <span class="nv">{{ nvbfb }}%</span>
        </span>
        <br />
        <span class="rs">{{ list.length ? list[1].num : '' }}：{{ list.length ? list[0].num : '' }}</span>
      </li>
    </ul>
  </div>
</template>
<script>
import { getSexApi } from '@/fetch/bigscreen.js';
export default {
  data() {
    return {
      list: [],
      nanbfb: 0,
      nvbfb: 0,
      total: '',
    };
  },
  created() {
    this.getSex();
  },
  methods: {
    getSex() {
      getSexApi().then(res => {
        this.list = res ?? [];
        if (res.length) {
          let nan = res[1].num;
          let nv = res[0].num;
          this.total = nan + nv;
          this.nanbfb = ((nan / this.total) * 100).toFixed(1);
          this.nvbfb = ((nv / this.total) * 100).toFixed(1);
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
.nnbl {
  margin-top: 20px;
  padding-top: 20px;
  width: 100%;
  text-align: center;
  img {
    cursor: pointer;
  }
  .bl {
    font-size: 20px;
    color: #fff;
    padding: 10px;
    .nan {
      cursor: pointer;
      color: #00f3ff;
      font-size: 24px;
      font-weight: 600;
    }
    .nv {
      cursor: pointer;
      color: #ff8ee8;
      font-size: 24px;
      font-weight: 600;
    }
  }
  .rs {
    color: #fff;
    font-size: 16px;
  }
}
</style>
