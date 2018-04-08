<template>
  <div class="header" id="header">
    <div class="main-box">
      <div class="clearfix">
        <router-link class="fl logo-box" to="/home">
        </router-link>
        <div class="header-right fl">
          <div class="header-right-top">
            <div class="hrt-text">
              <i class="hrt-ico-phone">&nbsp;</i>800-8979980</div>
            <!-- <div class="hrt-text">中文</div> -->
            <div class="hrt-text">
              <span v-if="!name">
                <router-link to="/login">登录</router-link>
                <!-- <a href="">登录</a> -->
                <span class="shu">|</span>
                <span>
                  <router-link to="/register">
                    注册
                  </router-link>
                </span>
              </span>
              <span v-if="name">
                <span class="hrt-t-username">
                  <router-link to="/personalCenter/baseInfo">
                    {{name}}
                  </router-link>
                </span>
                <span @click="loginOut" class="hrt-t-loginOut">退出</span>
              </span>
            </div>
          </div>
          <div class="header-right-bottom">
            <router-link to="/home" class="hrb-item">
              首页
            </router-link>
            <router-link to="/priceCenter" class="hrb-item">
              价格中心
            </router-link>
            <!-- <router-link to="/supplementData" class="hrb-item">
              补充资料
            </router-link> -->
            <router-link to="/bankStatement" class="hrb-item">
              对账单
            </router-link>
            <router-link to="/orderCenter" class="hrb-item">
              订单中心
            </router-link>
            <router-link to="/ff" class="hrb-item">
              数据报表
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="header-full-line"></div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'header',
    components: {},
    data() {
      return {
        isLogin: true
      }
    },
    async mounted() { },
    computed: {
      ...mapGetters([
        'name',
      ])
    },
    methods: {
      loginOut() {
        this.$store.dispatch('LogOut').then(() => {
          location.reload()// 为了重新实例化vue-router对象 避免bug
        })
      }
    }
  }

</script>

<style lang="scss" scoped>
  #header {
    position: relative;
    .logo-box {
      width: 208px;
      height: 52px;
      margin: 19px 0 28px;
      background-color: #000;
    }
    .header-right {
      margin-left: 312px;
      width: 680px;
    }
    .header-right-top {
      margin-top: 8px;
      font-size: 0;
      text-align: right;
      a {
        color: #333;
      }
      .hrt-text {
        font-size: 14px;
        margin-left: 20px;
        line-height: 44px;
        display: inline-block;
        .hrt-t-username a {
          color: #6297F4
        }
        .hrt-t-loginOut {
          color: #666;
          margin-left: 5px;
          font-size: 12px;
          cursor: pointer;
        }
      }
      .hrt-ico-phone {
        width: 22px;
        height: 22px;
        background: url('../../../assets/icon-phone-header.png') no-repeat center;
        background-size: 100% 100%;
        display: inline-block;
        vertical-align: middle;
        margin-right: 5px;
      }
      .hrt-text:first-child {
        margin-left: 0;
      }
      .shu {
        font-size: 14px;
        display: inline-block;
        padding: 0 8px;
      }
    }
    .header-right-bottom {
      text-align: right;
      font-size: 0;
      .hrb-item {
        font-size: 16px;
        padding: 0 20px;
        line-height: 30px;
        display: inline-block;
        color: #000;
        text-decoration: none;
      }
      .hrb-item:hover {
        color: #6297F4;
        text-decoration: none;
      }
      .hrb-item.router-link-active {
        background-color: #6297F4;
        color: #fff;
      }
    }
    .header-full-line {
      width: 100%;
      height: 4px;
      background-color: #6297F4;
      position: absolute;
      bottom: -4px;
      z-index: -1;
    }
  }
</style>