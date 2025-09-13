<!-- 角色管理 -->
<template>
  <div>
    <co-form class="filter-container" layout="inline">
      <co-form-item label="角色名称">
        <co-input type="text" v-model="roleName" allowClear placeholder="请输入角色名称"></co-input>
      </co-form-item>
      <co-form-item>
        <co-button type="primary" @click="onSearch">查询</co-button>
      </co-form-item>
      <co-form-item>
        <co-button type="primary" @click="onCancel">取消查询</co-button>
      </co-form-item>
    </co-form>
    <div class="operation-container">
      <co-button type="primary" icon="plus" @click="onAdd">新增</co-button>
      <co-button type="primary" icon="delete" :disabled="selectedRowKeys.length === 0" @click="deleteConfirm()"
        >删除</co-button
      >
    </div>
    <co-table
      :rowSelection="rowSelection"
      :columns="tableColumns"
      :dataSource="tableData"
      :loading="loading"
      :pagination="pagination"
      rowKey="roleId"
      :scroll="{ y: scrollY }"
      @change="handleTableChange"
    >
      <span slot="operate" slot-scope="text, record">
        <co-action-button :actions="getActions()" :data="record">
          <co-popconfirm slot="delete" title="确认要删除吗？" slot-scope="{ text }" @confirm="onDelete(record)">
            <co-button type="link">{{ text }}</co-button>
          </co-popconfirm>
        </co-action-button>
      </span>
    </co-table>
    <!--新增模态框-->
    <role-modal ref="roleModal" @refreshPage="refreshPage"></role-modal>
    <!--查看模态框-->
    <co-modal v-model="lookModal" title="查看角色">
      <div slot="footer">
        <co-button type="default" @click="lookModal = false">关闭</co-button>
      </div>
      <co-descriptions :column="1" bordered>
        <co-descriptions-item label="角色名称">{{ roleInfo.roleName }}</co-descriptions-item>
        <co-descriptions-item label="角色简称">{{ roleInfo.rolePname }}</co-descriptions-item>
      </co-descriptions>
    </co-modal>
  </div>
</template>

<script>
import Axios from 'axios';
import { queryRolePage, deleteRoleByIds } from '@co/api-xtgl';
import calculateTableHeight from '@/libs/mixins/calculateTableHeight';
import roleModal from './roleModal';

export default {
  name: 'role',
  components: {
    roleModal,
  },
  mixins: [calculateTableHeight],
  data() {
    return {
      loading: false,
      tableData: [],
      roleName: '', // 角色名称
      pagination: { current: 1, pageSize: 10, total: 0 },
      roleInfo: {},
      applyData: [],
      lookModal: false,
      tableColumns: [
        {
          title: '角色名称',
          dataIndex: 'roleName',
          width: 400,
        },
        {
          title: '角色简称',
          dataIndex: 'rolePname',
          width: 200,
          ellipsis: true,
        },
        {
          title: '操作',
          dataIndex: 'operate',
          width: 150,
          scopedSlots: { customRender: 'operate' },
        },
      ],
      addModal: false, // 新增模态框
      selectedRowKeys: [], // 选中行ID的数组
      request: null, // 请求对象
    };
  },
  computed: {
    rowSelection() {
      const { selectedRowKeys } = this;
      return {
        selectedRowKeys,
        onChange: selectedRowKeys => {
          this.selectedRowKeys = selectedRowKeys;
        },
      };
    },
  },
  created() {
    this.render(this.pagination.current, this.pagination.pageSize);
  },
  methods: {
    getActions() {
      return [
        { text: '编辑', clickFun: this.onEdit },
        { text: '查看', clickFun: this.onDetail },
        { text: '删除', scopedSlots: { customRender: 'delete' } },
      ];
    },
    // 分页器change事件
    handleTableChange(pagination, filters, sorter) {
      const pager = { ...this.pagination, ...pagination };
      this.pagination = pager;
      this.render(pager.current, pager.pageSize);
    },
    // 刷新当前页面
    refreshPage() {
      const { pageSize } = this.pagination;
      this.render(1, pageSize);
    },
    // 删除模态框确认
    deleteConfirm(item) {
      const { onDelete } = this;
      this.$confirm({
        title: '删除',
        content: '确定要删除吗？',
        onOk() {
          onDelete(item);
        },
      });
    },
    // 查询列表
    render(pageNum, pageSize) {
      const params = {
        pageNum,
        pageSize,
        roleName: this.roleName,
      };
      this.tableData = [];
      this.selectedRowKeys = [];
      this.loading = true;
      this.request = Axios.CancelToken.source();
      queryRolePage(params, { cancelToken: this.request.token })
        .then(res => {
          if (!res.total) {
            this.$message.info('根据条件查不到数据');
            this.pagination.total = 0;
          } else {
            this.pagination.total = res.total;
            this.tableData = res.list.map(i => {
              return {
                roleId: i.id,
                rolePname: i.nameCn,
                roleName: i.roleName,
              };
            });
            this.resizeTable();
          }
        })
        .finally(() => {
          this.request = null;
          this.loading = false;
        });
    },
    // 新增角色
    onAdd() {
      this.$refs.roleModal.show();
    },
    // 删除
    onDelete(item) {
      const ids = item === undefined ? this.selectedRowKeys.join(',') : item.roleId;
      return deleteRoleByIds(ids).then(res => {
        this.$message.success('删除成功');
        this.refreshPage();
      });
    },
    // 编辑
    onEdit(record, event) {
      this.roleInfo = record;
      this.$refs.roleModal.show(record);
    },
    // 查看
    onDetail(record, event) {
      this.roleInfo = record;
      this.lookModal = true;
    },
    // 查询
    onSearch() {
      const pager = { ...this.pagination, current: 1 };
      this.pagination = pager;
      this.render(pager.current, pager.pageSize);
    },
    // 取消查询
    onCancel() {
      this.request && this.request.cancel('取消查询');
    },
  },
};
</script>
