<template>
  <coModal v-model="visible" :title="title" :mask-closable="false" :width="500" @ok="addModalok" @cancel="closeModal">
    <co-form :form="roleForm" v-bind="formItemLayout">
      <co-form-item label="角色名称">
        <co-input :maxLength="32" v-decorator="rules.roleName" allowClear placeholder="请输入角色名称"></co-input>
      </co-form-item>
      <co-form-item label="角色简称">
        <co-input :maxLength="32" v-decorator="rules.rolePname" allowClear placeholder="请输入角色简称"></co-input>
      </co-form-item>
    </co-form>
  </coModal>
</template>
<script>
import { validateName } from '@co/common';
import { getRoleCount, saveRole } from '@co/api-xtgl';
export default {
  props: {},
  data() {
    const roleNameUnique = (rule, value, callback) => {
      const params = {
        roleName: value,
      };
      if (this.title !== '新增角色') {
        params.idIsNotEqual = this.roleId;
      }
      getRoleCount(params).then(res => {
        if (res > 0) {
          callback(new Error('该角色名称已存在'));
        } else {
          callback();
        }
      });
    };
    return {
      visible: false, // 是否显示
      title: '', // 标题
      roleId: '', // 角色ID
      roleForm: this.$form.createForm(this), // form对象
      formItemLayout: {
        // 布局
        labelCol: {
          xs: { span: 24 },
          sm: { span: 6 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      },
      rules: {
        // 校验规则
        roleName: [
          'roleName',
          {
            validateFirst: true,
            rules: [
              { required: true, message: '角色名称不能为空' },
              { validator: validateName('角色名称') },
              { validator: roleNameUnique },
            ],
          },
        ],
        rolePname: [
          'rolePname',
          {
            validateFirst: true,
            rules: [{ required: true, message: '角色简称不能为空' }, { validator: validateName('角色简称') }],
          },
        ],
      },
    };
  },
  methods: {
    // 显示弹窗
    show(data = {}) {
      const { roleId, roleName, rolePname } = data;
      this.roleId = roleId;
      this.title = data.roleId ? '编辑角色' : '新增角色';
      this.visible = true;
      this.$nextTick(() => this.roleForm.setFieldsValue({ roleName, rolePname }));
    },
    // 关闭弹窗
    closeModal() {
      this.visible = false;
      this.roleForm.resetFields();
    },
    addModalok() {
      // 新增角色、编辑角色确认
      this.roleForm.validateFields((error, values) => {
        if (!error) {
          const { roleName, rolePname } = values;
          const params = {
            roleName: roleName,
            nameCn: rolePname,
            delFlag: 0,
          };
          if (this.roleId) {
            params.id = this.roleId;
          }
          saveRole(params).then(res => {
            this.$message.success(this.roleId ? '编辑成功' : '新增成功');
            this.$emit('refreshPage');
            this.closeModal();
          });
        }
      });
    },
  },
};
</script>
