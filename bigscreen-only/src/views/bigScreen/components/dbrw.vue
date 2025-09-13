<template>
  <div>
    <co-spin :spinning="loading">
      <ul class="dbrwList">
        <li @click="routerTo(item.resourceVal)" v-for="(item, index) in list" :key="index" :class="'item-' + index">
          <div>{{ item.title }}</div>
          <div v-if="item.count">{{ item.count }}条</div>
        </li>
      </ul>
    </co-spin>

    <co-modal width="1200px" title="列表" :visible="modal" @ok="handleOk" @cancel="handleCancel">
      <co-table :columns="columns" :dataSource="data"> </co-table>

      <template slot="footer">
        <co-button @click="handleCancel">返回</co-button>
      </template>
    </co-modal>
  </div>
</template>
<script>
const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '内容',
    dataIndex: 'nr',
    key: 'nr',
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: { customRender: 'action' },
  },
];
import { getTask } from '@/fetch/bigscreen.js';
export default {
  data() {
    return {
      loading: false,
      list: [
        // {
        //   name: '待办任务',
        // },
        // {
        //   name: '指令核查',
        //   num: 1,
        // },
        // {
        //   name: '情报处置',
        //   num: 1,
        // },
        // {
        //   name: '更多...',
        // },
      ],
      columns,
      modal: false,
      data: [
        {
          nr: '测试测试测试测试测试测试测试测试测试',
          name: '测试1',
        },
        {
          nr: '测试测试测试测试测试测试测试测试测试',
          name: '测试1',
        },
      ],
    };
  },
  created() {
    this.getTask();
  },
  methods: {
    routerTo(url) {
      window.open(url);
    },
    getTask() {
      this.loading = true;
      getTask()
        .then(res => {
          let list = [];
          res.content.forEach(v => {
            if (v.count && list.length < 3) {
              list.push(v);
            }
          });

          this.list = list;

          console.log(list, 'list');
        })
        .finally(() => {
          this.loading = false;
        });
    },
    showModal(item) {
      this.modal = true;
    },
    handleOk() {
      this.modal = false;
    },
    handleCancel() {
      this.modal = false;
      this.data = [];
    },
  },
};
</script>
<style lang="less" scoped>
.dbrwList {
  display: grid;
  height: 250px;
  padding: 30px;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 25px;
  li {
    color: #fff;
    height: 100%;
    font-size: 20px;
    cursor: pointer;
    display: flex;
    // align-items: center;
    justify-content: center;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s, box-shadow 0.3s;
    text-align: center;
    flex-direction: column;
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }
  }
  .item-0 {
    background: linear-gradient(135deg, #ff7e5f, #feb47b);
  }
  .item-1 {
    background: linear-gradient(135deg, #6a11cb, #2575fc);
  }
  .item-2 {
    background: linear-gradient(135deg, #43cea2, #185a9d);
  }
  .item-3 {
    background: linear-gradient(135deg, #ffafbd, #ffc3a0);
  }
}
</style>
