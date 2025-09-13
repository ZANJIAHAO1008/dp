<!-- 登录页 -->
<template>
  <div class="login" @keydown.enter="handleSubmit">
    <div class="login-con">
      <img style="width: 100%" :src="logoUrl || require('@/images/login/login_logo.png')" alt="" />
      <co-tabs defaultActiveKey="1" size="large" :tabBarStyle="{ color: '#fff' }">
        <co-tab-pane tab="账号密码登录" key="1">
          <co-form :form="loginForm" class="loginform">
            <co-form-item>
              <co-input v-decorator="rules.username" placeholder="请输入用户名" allowClear>
                <co-icon slot="prefix" type="user" style="color: #57a3f3" />
              </co-input>
            </co-form-item>
            <co-form-item>
              <co-input-password v-decorator="rules.password" placeholder="请输入密码" allowClear>
                <co-icon slot="prefix" type="lock" style="color: #57a3f3" />
              </co-input-password>
            </co-form-item>
            <!-- <co-form-item prop="identicode">
              <co-input class="captcha" v-decorator="rules.identicode" placeholder="请输入验证码">
                <co-icon slot="prefix" type="check-circle" style="color: #57a3f3" />
                <img slot="suffix" :src="captcha" title="点击刷新验证码" @click="editCaptcha" />
              </co-input>
            </co-form-item> -->
            <co-form-item id="login">
              <co-button @click="handleSubmit" type="primary" block>登录</co-button>
            </co-form-item>
          </co-form>
        </co-tab-pane>
        <co-tab-pane tab="PKI登录" key="2">
          <p class="pkiImg" @click="handlePki">
            <img src="../images/login/pkiImg.png" alt="" />
          </p>
        </co-tab-pane>
      </co-tabs>
    </div>
  </div>
</template>

<script>
import bcrypt from 'bcryptjs';
import { rewriteToken } from '@co/api';
import {
  loginUrl,
  authOrEncry,
  authByOnlyOne,
  checkFirstSingleLogin,
  getCaptcha,
  pkiLogin,
  pkiApply,
} from '@co/api-login';
import { AppModule } from '@/store/modules';

export default {
  data() {
    return {
      logoUrl: null, // 左上角图标
      loginForm: this.$form.createForm(this),
      rules: {
        username: ['username', { rules: [{ required: true, message: '账号不能为空', trigger: 'blur' }] }],
        password: ['password', { rules: [{ required: true, message: '密码不能为空', trigger: 'blur' }] }],
        identicode: ['identicode', { rules: [{ required: true, message: '验证码不能为空', trigger: 'blur' }] }],
      },
      captcha: '', // 图片验证码
      isAllowMoreLogin: null, // 是否允许同一账号多处在线
    };
  },
  created() {
    const {
      isAllowMoreLogin = true,
      header: { logoUrl },
    } = this.config; // 默认为 true
    this.isAllowMoreLogin = isAllowMoreLogin;
    this.logoUrl = logoUrl;
  },
  mounted() {
    this.editCaptcha();
  },
  methods: {
    // 图片验证码
    editCaptcha() {
      this.captcha = getCaptcha();
    },
    // 点击登录
    handleSubmit() {
      this.loginForm.validateFields((error, values) => {
        if (!error) {
          if (this.isAllowMoreLogin) {
            this.login(values);
          } else {
            checkFirstSingleLogin(values).then(res => {
              if (res) {
                this.login(values);
              } else {
                this.$confirm({
                  title: '提示',
                  okText: '确定',
                  content: '当前账号已经登录，重新登录会挤掉上个用户，是否重新登录？',
                  onOk: () => this.login(values),
                });
              }
            });
          }
        }
      });
    },
    // 账号密码登录
    login({ username, password } = {}) {
      // bcrypt加密
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      const loginApi = this.isAllowMoreLogin ? authOrEncry : authByOnlyOne;
      loginApi({ username, password: hash }).then(token => {
        this.loginSuccess(token, username);
      });
    },
    // pki登录
    handlePki() {
      window.open(loginUrl + '/pki/pkiTest');
      let times = 3; // 接口异常重试次数
      const func = () =>
        pkiLogin()
          .then(res => {
            if (res === 10013) {
              // 10013是未查询到pki用户
              // this.handleApplyAcount();
              this.$message.warning('该用户未注册，请联系管理员绑定PKI');
            } else {
              this.loginSuccess(res, res);
            }
          })
          .catch(() => {
            if (--times > 0) {
              setTimeout(func, 1000); // 重试
            } else {
              this.$message.error('PKI 登录失败');
            }
          });
      setTimeout(func, 1000);
    },
    async loginSuccess(token, user) {
      await rewriteToken(token, user); // 更新远端token和user
      AppModule.gotoHome();
    },
    // pki注册
    handleApplyAcount() {
      pkiApply({ reason: 'PKI注册' }).then(() => {
        this.$message.success('PKI注册成功，请等到审核通过使用！');
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import './login.less';
</style>
<style lang="less">
.login {
  .co-tabs-tab {
    width: 140px;
  }
  .captcha {
    .co-input {
      padding-right: 110px;
    }
    .co-input-suffix {
      right: 0;
    }
  }
}
</style>
