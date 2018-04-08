<template>
  <div id="login-container">
    <div class="main-box">
      <div class="top">
        <span class="top-sign-in-text">账户登录</span>
      </div>
    </div>
    <div class="mid-box" @keyup.enter="Login">
      <div class="login-box">
        <div class="w100b table lb-top">
          <div :class="['table-cell','lbt-item',isPasswordLogin?'active':'']" @click="isPasswordLogin=true">密码登录</div>
          <div :class="['table-cell','lbt-item',isPasswordLogin?'':'active']" style="text-align:right" @click="isPasswordLogin=false">短信登录</div>
        </div>
        <div class="mb-input-box">
          <el-form autoComplete="on" :model="loginForm" ref="loginForm" label-position="left" :inline="false">
            <div v-show="isPasswordLogin">
              <el-form-item>
                <!-- <el-input v-model="loginForm.name" placeholder="手机号码/邮箱地址"></el-input> -->
                <el-input v-model="loginForm.name" placeholder="用户名"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input v-model="loginForm.password" placeholder="请输入密码" type="password"></el-input>
              </el-form-item>
            </div>
            <div v-show="!isPasswordLogin">
              <el-form-item>
                <el-input v-model="loginForm.phone" placeholder="请输入手机号"></el-input>
              </el-form-item>
              <el-form-item label="" class="mb-authCode f0">
                <el-input v-model="loginForm.password"></el-input>
                <span class="btn-sendcode">发送验证码</span>
              </el-form-item>
            </div>
            <el-form-item class="mbib-remener-box">
              <div class="table w100b">
                <el-checkbox v-model="loginForm.remeberLogin" class="table-cell">自动登录</el-checkbox>
                <div class="table-cell" style="text-align:right">
                  <router-link to="/register" class="mbib-register">立即注册</router-link>
                  <!-- <span class="mbib-register"></span> -->
                  <router-link class="mbib-forget-pw" to="/findBackPW">忘记密码？</router-link>
                </div>
              </div>
            </el-form-item>
          </el-form>
          <div class="btn-login ht_btn_default" @click="Login">
            登录
          </div>
        </div>
      </div>
    </div>

    <footer class="lc-footer">
      Copyright © 2012-2017广州智运科技有限公司 ｜粤公网安备 31011002000858号｜粤ICP备 1
    </footer>
  </div>
</template>

<script>
  import { form, formItem, input, checkbox } from 'element-ui'
  import { test } from '@/api/loginAPI'
  import md5 from 'blueimp-md5'
  export default {
    components: {
      'el-form': form,
      'el-form-item': formItem,
      'el-input': input,
      'el-checkbox': checkbox
    },
    name: 'login',
    data() {
      return {
        loginForm: {
          name: '',
          password: '',
          phone: '',
          authCode: '',
          remeberLogin: true
        },
        isPasswordLogin: true
      }
    },
    methods: {
      Login() {
        if (this.isPasswordLogin) {
          const postData = {
            name: this.loginForm.name,
            password: md5(this.loginForm.password)
          }
          this.$refs.loginForm.validate(valid => {
            if (valid) {
              this.$store.dispatch('LoginByUsername', postData).then(() => {
                this.$router.push({ path: '/' })
                // this.showDialog = true
              }).catch(() => {
              })
            } else {
              console.log('error submit!!')
              return false
            }
          })
        }
      }
    },
    mounted() {
      // test()
    },
    created() {
      // window.addEventListener('hashchange', this.afterQRScan)
    },
    destroyed() {
      // window.removeEventListener('hashchange', this.afterQRScan)
    }
  }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  #login-container {
    .top-sign-in-text {
      font-size: 30px;
      padding: 40px 0;
      display: inline-block;
    }
    .mid-box {
      width: 100%;
      height: 593px;
      background: url('../../assets/login-bg.png') no-repeat center;
      background-size: cover;
      position: relative;
      .login-box {
        width: 360px;
        box-sizing: border-box;
        padding: 40px 40px 50px;
        background-color: #fff;
        position: absolute;
        top: 100px;
        right: 18%;
      }
      .lb-top {
        font-size: 24px;
        line-height: 24px;
      }
      .lbt-item {
        cursor: pointer;
      }
      .lbt-item:first-child {
        border-right: 2px solid #ddd;
        text-align: left;
      }
      .lbt-item.active {
        color: #6297F4;
      }
      .mb-input-box {
        padding-top: 26px;
      }
      .el-form .el-input /deep/ .el-input__inner {
        border-color: #ddd;
        height: 46px;
        font-size: 18px;
      }
      .btn-login {
        color: #fff;
        font-size: 24px;
        line-height: 48px;
        background-color: #6297F4;
        text-align: center;
        cursor: pointer;
      }
      .mbib-remener-box {
        font-size: 14px;
        line-height: 1;
        color: #999;
      }
      .el-form /deep/ .el-checkbox__inner {
        width: 14px;
        height: 14px;
      }
      .el-form /deep/ .el-checkbox__inner::after {
        height: 7px;
        left: 4px;
      }
      .el-form /deep/ .el-checkbox__label {
        font-size: 14px;
        color: #999;
        padding-left: 6px;
      }
      .mb-authCode .el-input {
        width: 140px;
      }
      .mb-authCode /deep/ .el-form-item__content {
        .el-input {
          vertical-align: middle;
        }
        font-size: 0;
      }
      .btn-sendcode.loading {
        background-color: #F4F4F4;
      }
      .btn-sendcode {
        cursor: pointer;
        font-size: 18px;
        width: 130px;
        background-color: #6297F4;
        line-height: 46px;
        display: inline-block;
        color: #fff;
        text-align: center;
        vertical-align: middle;
        margin-left: 10px;
      }
      .mbib-register {
        color: #999;
      }
      .mbib-forget-pw {
        color: #D84C56;
        padding-left: 12px;
      }
    }
    .lc-footer {
      font-size: 14px;
      line-height: 1;
      padding: 40px 0;
      text-align: center;
    }
  }
</style>