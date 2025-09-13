<template>
  <div>
    <span class="title"
      ><span class="title-gradient">{{ title }}</span></span
    >
    <Select
     v-if="isSelect"
      v-model="select"
      @on-change="handleChange"
      size="small"
      style="width: 100px; position: absolute; right: 1px; top: 0px; z-index: 99999"
    >
      <Option v-for="item in dateList" :value="item.value" :key="item.value">{{ item.title }}</Option>
    </Select>
  </div>
</template>
<script>
export default {
  name: 'dpTitle',
  props: {
    title:{
      type:String,
      default:''
    },
    isSelect:{
      type:Boolean,
      default:true
    },
    dateList:{
      type:Array,
      default:(()=>[
        { title: '近24小时', value: '9' },
        { title: '近7天', value: '8' },
        { title: '近30天', value: '7' },
        { title: '近1年', value: '6' },
      ])
    },
     select:{
      type:String,
      default:'9'
    },
  },
  data() {
    return {
    };
  },
  methods: {
    handleChange(e) {
      this.select = e;
      this.$emit('changeDate', e);
    },
  },
};
</script>

<style lang="less">
.ivu-select-small.ivu-select-single .ivu-select-selection .ivu-select-placeholder,
.ivu-select-small.ivu-select-single .ivu-select-selection .ivu-select-selected-value {
  background: #1a3c58;
  // border: 1px solid #75deef;
  color: #75deef;
}
.ivu-select-selection {
  border: 1px solid #75deef;
}
</style>
