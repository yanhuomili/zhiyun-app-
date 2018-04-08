<template>
  <footer class="footer">
    <div class="footer-bg">
      <div class="footer-box clearfix">
        <div class="footer-box-left pos-r">
          <div class="erweima">
            <img src="../assets/weixin.jpg" alt="" class="img-wh100">
          </div>
          <div class="erweima-text">智运微信平台</div>
        </div>
        <div class="footer-box-right">
          <div class="footer-br-top">
            <ul>
              <li class="footer-bt-item">
                <h2>
                  <a href="#">业务常识</a>
                </h2>
                <p>
                  <a href="#" target="_blank">注册和密码</a>
                </p>
                <p>
                  <a href="#" target="_blank">付账方式及账期</a>
                </p>
                <p>
                  <a href="#" target="_blank">委托方式</a>
                </p>
              </li>
              <li class="footer-bt-item">
                <h2>
                  <a href="#">行业相关</a>
                </h2>
                <p>
                  <a href="#" target="_blank">贸易相关</a>
                </p>
                <p>
                  <a href="#" target="_blank">运输相关</a>
                </p>
                <p>
                  <a href="#" target="_blank">报关相关</a>
                </p>
              </li>
              <li class="footer-bt-item">
                <h2>
                  <a href="#">关于我们</a>
                </h2>
                <p>
                  <a href="#" target="_blank">智运介绍</a>
                </p>
                <p>
                  <a href="#" target="_blank">公司新闻</a>
                </p>
                <p>
                  <a href="#" target="_blank">服务条款</a>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- <a href="http://coreui.io">CoreUI</a> &copy; 2017 creativeLabs.
    <span class="float-right">Powered by <a href="http://coreui.io">CoreUI</a></span> -->
    <p class="text-center copyright">Copyright © 2012-2017 广州智运科技有限公司 | 粤公网安备31011002000858号 | 粤ICP备1</p>
  </footer>
</template>
<script>
  export default {
    name: 'footer'
  }

</script>
<style lang="scss" scoped>
  .footer {
    background: #0076b0;
    width: 100%;
    background: #0076b0;
    min-width: 1200px;
    /* .footer-box:after {
      content: "";
      display: block;
      height: 282px;
      width: 1px;
      position: absolute;
      top: 32px;
      left: 264px;
      background: #0081C1;
    } */
    .footer-bg {
      width: 100%;
      background: url('../../../assets/footer.png') no-repeat center;
      background-size: cover;
    }
    .footer-box {
      width: 1200px;
      height: 180px;
      padding: 52px 0;
      margin: 0 auto;
      position: relative;
      color: #fff;
    }
    .footer-box-left {
      font-size: 24px;
      color: #ffffff;
      letter-spacing: 0.67px;
      line-height: 42px;
      width: 396px;
      float: left;
      height: 100%;
      box-sizing: border-box;
      border-right: 1px dashed #ddd;
    }
    .erweima {
      margin-left: 126px;
      width: 146px;
      height: 146px;
      display: inline-block;
    }
    .erweima-text {
      line-height: 46px;
      font-size: 14px;
      text-align: center;
      color: #fff;
    }
    .footer-box-right {
      float: right;
    }
    .footer-br-top {
      /* border-bottom: 1px dotted #0098e4; */
      overflow: hidden;
      padding-bottom: 10px;
    }
    .footer-bt-item {
      float: left;
      width: 268px;
      text-align: center;
      margin-top: 22px;
      h2 {
        font-weight: normal;
        margin-bottom: 30px;
        font-size: 18px;
        line-height: 18px;
        a {
          font-size: 18px;
          line-height: 18px;
          color: #fff;
          display: inline-block;
        }
      }
      p {
        margin-top: 20px;
        font-size: 14px;
        line-height: 14px;
        a {
          font-size: 14px;
          line-height: 14px;
          display: inline-block;
          color: #fff;
        }
      }
    }
    .copyright {
      width: 100%;
      line-height: 100px;
      color: #fff;
      font-size: 14px;
      background-color: #333;
    }
  }
</style>