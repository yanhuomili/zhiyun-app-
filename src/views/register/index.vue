<template>
  <div id="register-container">
    <div class="main-box">
      <div class="top">
        <span class="top-sign-in-text">账户注册</span>
      </div>
      <div class="top-tab text-center">
        <ul class="top-tab-list f0">
          <li :class="['top-tab-item',registerStep==1?'active':'']">
            <span class="top-ti-stepnum">1</span>
            <span class="top-ti-steptext">用户注册</span>
          </li>
          <li :class="['top-tab-item',registerStep==2?'active':'']">
            <span class="top-ti-stepnum">2</span>
            <span class="top-ti-steptext">填写账号信息</span>
          </li>
          <li :class="['top-tab-item',registerStep==3?'active':'']">
            <span class="top-ti-stepnum">3</span>
            <span class="top-ti-steptext">注册成功</span>
          </li>
        </ul>
        <div class="top-tab-right f0">
          <span class="top-tab-r_span">已有账户，</span>
          <router-link to="/login" class="top-tab-r_span top-tab-r_span2">马上登录</router-link>
          <!-- <span class="top-tab-r_span top-tab-r_span2">马上登录</span> -->
          <span class="top-tab-r_span top-tab-r_shu">|</span>
          <router-link to="/home" class="top-tab-r_span top-tab-r_span2">返回智运网</router-link>
          <!-- <span class="top-tab-r_span top-tab-r_span4">返回智运网</span> -->
        </div>
      </div>
      <div class="mid-box">
        <div v-if="registerStep==1">
          <el-form autoComplete="on" :model="registerForm" ref="registerForm1" label-position="left" :inline="false" label-width="110px">
            <el-form-item label="手机号码">
              <el-input v-model="registerForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="验证码" class="mb-authCode f0">
              <el-input v-model="registerForm.code"></el-input>
              <span class="btn-sendcode">发送验证码</span>
            </el-form-item>
            <el-form-item>
              <span class="mb-next" @click="next">下一步</span>
            </el-form-item>
          </el-form>
        </div>
        <div v-if="registerStep==2">
          <el-form autoComplete="on" :model="registerForm" ref="registerForm2" label-position="left" :inline="false" label-width="110px"
            :rules="rules2">
            <el-form-item label="填写邮箱" prop="email">
              <el-input v-model="registerForm.email"></el-input>
            </el-form-item>
            <el-form-item label="用户名" prop="username">
              <el-input v-model="registerForm.username"></el-input>
            </el-form-item>
            <el-form-item label="设置密码" prop="password">
              <el-input v-model="registerForm.password" type="password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPassword">
              <el-input v-model="registerForm.checkPassword" type="password"></el-input>
            </el-form-item>
            <!-- <el-form-item label="公司">
              <el-input v-model="registerForm.nikename"></el-input>
            </el-form-item> -->
            <el-form-item>
              <el-checkbox v-model="registerForm.checked">我已同意《智运国际物流服务协议》</el-checkbox>
            </el-form-item>
            <el-form-item>
              <span class="mb-next ht_btn_default" :class="{loading:isRegistering}" @click="register">{{isRegistering?'注册中':'立即注册'}}</span>
            </el-form-item>
          </el-form>
        </div>
        <div v-if="registerStep==3">
          <div class="register-success">
            <div>
              <span class="icon-mb-rs">&nbsp;</span>
              <span style="vertical-align: middle;">恭喜您，注册成功</span>
            </div>
            <router-link class="mb-goto-login ht_btn_default" to="/login">
              前往登陆
            </router-link>
          </div>
        </div>
      </div>
      <div class="main-box">
        <div class="line1"></div>
      </div>
    </div>
    <footer class="lc-footer">
      Copyright © 2012-2017广州智运科技有限公司 ｜粤公网安备 31011002000858号｜粤ICP备 1
    </footer>
  </div>
</template>

<script>
  import { form, formItem, input, checkbox } from 'element-ui'
  import { register } from '@/api/loginAPI'
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
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.registerForm.checkPassword !== '') {
            this.$refs.registerForm2.validateField('checkPassword')
          }
          callback()
        }
      }
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.registerForm.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        registerForm: {
          code: '',
          phone: '',
          username: '',
          password: '',
          email: '',
          checked: true,
          remeberLogin: true,
          nikename: '',
          checkPassword: ''
        },
        isRegistering: false,
        registerStep: 2,
        rules2: {
          email: [
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
          ],
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 2, max: 12, message: '长度在 2 到 12 个字符', trigger: 'blur' }
          ],
          password: [
            { validator: validatePass, trigger: 'blur' },
            { required: true, message: '请输入密码' },
            { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
          ],
          checkPassword: [
            { validator: validatePass2, trigger: 'blur' },
            { required: true, message: '请输入密码' },
            { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
          ],
        }
      }
    },
    methods: {
      next() {
        this.registerStep++
      },
      register() {
        if (this.isRegistering) {
          return false
        }
        this.$refs['registerForm2'].validate(async (valid) => {
          if (valid) {
            this.isRegistering = true
            try {
              const postData = {
                phone: this.registerForm.phone,
                username: this.registerForm.username,
                password: md5(this.registerForm.password),
                email: this.registerForm.email,
                nikename: this.registerForm.nikename
              }
              await register({ data: postData })
              this.registerStep++
            } catch (error) {
              this.isRegistering = false
              throw Error(error)
            }
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    },
    mounted() {

    }
  }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  #register-container {
    .top-sign-in-text {
      font-size: 30px;
      padding: 40px 0;
      display: inline-block;
    }
    .top-tab {
      border-bottom: 1px solid #ddd;
      position: relative;
    }
    .top-tab-list {
      position: relative;
      display: inline-block;
    }
    .top-tab-item {
      display: inline-block;
      position: relative;
      padding: 0 20px 16px;
      .top-ti-stepnum {
        display: inline-block;
        width: 30px;
        height: 30px;
        background-color: #ccc;
        color: #fff;
        border-radius: 100% 100%;
        font-size: 24px;
        line-height: 30px;
        text-align: center;
      }
      .top-ti-steptext {
        font-size: 20px;
        color: #999;
        line-height: 30px;
        margin-left: 10px;
      }
    }
    .top-tab-item.active:after {
      content: '';
      display: block;
      width: 100%;
      position: absolute;
      height: 2px;
      background-color: #6297F4;
      bottom: -1px;
      left: 0;
    }
    .top-tab-item+.top-tab-item {
      margin-left: 30px;
    }
    .top-tab-item.active {
      .top-ti-stepnum {
        background-color: #6297F4;
      }
      .top-ti-steptext {
        color: #333;
      }
    }
    .top-tab-right {
      display: inline-block;
      position: absolute;
      right: 0;
      line-height: 40px;
      .top-tab-r_shu {
        padding: 0 18px;
      }
      .top-tab-r_span {
        font-size: 16px;
        display: inline-block;
      }
      .top-tab-r_span2,
      .top-tab-r_span4 {
        color: #D84C56;
      }
    }
    .mid-box {
      width: 390px;
      margin: 80px auto 140px;
      .mb-next {
        display: inline-block;
        width: 100%;
        line-height: 48px;
        font-size: 24px;
        color: #fff;
        text-align: center;
        background-color: #6297F4;
        cursor: pointer;
      }
      .el-form {
        .el-form-item /deep/ .el-form-item__label {
          line-height: 48px;
          font-size: 16px;
          color: #999;
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
        .el-form-item {
          margin-bottom: 24px;
        }
        .el-form-item /deep/ .el-input__inner {
          height: 48px;
          border-color: #ddd;
        }
        .el-form-item /deep/ .el-checkbox__input {
          .el-checkbox__inner {
            width: 14px;
            height: 14px;
          }
          .el-checkbox__inner:after {
            height: 7px;
            left: 4px;
          }
        }
        .el-form-item /deep/ .el-checkbox__label {
          font-size: 14px;
          color: #333;
        }
        .btn-sendcode.loading {
          background-color: #F4F4F4;
        }
        .btn-sendcode {
          font-size: 18px;
          width: 130px;
          background-color: #6297F4;
          line-height: 48px;
          display: inline-block;
          color: #fff;
          text-align: center;
          vertical-align: middle;
          margin-left: 10px;
        }
      }
      .register-success {
        font-size: 20px;
        text-align: center;
        .icon-mb-rs {
          display: inline-block;
          width: 53px;
          height: 38px;
          margin-right: 12px;
          background: url('../../assets/icon-register-success.png') no-repeat center;
          background-size: 100% 100%;
          vertical-align: middle;
        }
        .mb-goto-login {
          margin-top: 50px;
          background-color: #6297F4;
          color: #fff;
          font-size: 14px;
          padding: 0 16px;
          line-height: 32px;
          display: inline-block;
        }
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