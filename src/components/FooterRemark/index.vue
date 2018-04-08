<template>
  <div class="FooterRemark" id="FooterRemark">
    <div class="remark-box table">
      <div class="table-cell" @click="isRemarkShow=true">
        <i class="icon icon-up">&nbsp;</i>
        备注</div>
      <div class="table-cell" @click="isServiceTelShow=true">
        <i class="icon icon-up">&nbsp;</i>联系方式</div>
    </div>
    <div>
      <popup v-model="isServiceTelShow" position="bottom">
        <div class="popup-remark">
          <div class="popup-remark-phone">
            <div class="popup-rp-text">
              联系方式
            </div>
            <div class="popup-rp-phone">
              {{this.phone}}
            </div>
          </div>
          <div class="popup-cancel text-center" @click="isServiceTelShow=false">取消</div>
        </div>
      </popup>
    </div>
    <div>
      <popup v-model="isRemarkShow" position="bottom">
        <div class="popup-remark">
          <div class="popup-remark-phone">
            <div class="popup-rp-text">
              海运备注
            </div>
            <div class="popup-rp-phone popup-rp-text-box" v-html="value">
              <!-- <p>1.运价参照GB1598调整方案。 </p>
              <p>2.预提箱费参考标准：（特种箱，缺柜，以及春节除外）2017.12.1号更 新 MSK：300元/柜；CMA：300元/柜；HMM：250元/柜；MSC：250元/柜；ZIM：250元/柜； 其余未列明船公司 200元/柜，当日加急预提300元/柜，不分船公司。</p>
              <p>3.洋山落箱费含二次进港20尺500元/柜，40尺600元/柜，五一，十一，春节实报实销； </p>
              <p>4.洋山提箱费：300元/柜。 </p>
              <p>5.其它未列及费用可电讯4001556956。</p> -->
            </div>
          </div>
          <div class="popup-cancel text-center" @click="isRemarkShow=false">取消</div>
        </div>
      </popup>
    </div>
  </div>
</template>
<script>
  import { Popup } from 'vux'
  export default {
    props: {
      value: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        isServiceTelShow: false,
        isRemarkShow: false,
        phone: window.HTCONFIG.contact.phone
      }
    },
    components: {
      Popup
    }
  }
</script>
<style lang="less" scoped>
  @import "./../../styles/var.less";
  #FooterRemark {
    .remark-box {
      position: absolute;
      bottom: 0;
      width: 100%;
      background-color: #F7F7FA;
      border-top: 1/@baseFontSize*1rem solid #D8D8D8;
      .table-cell {
        border-right: 1/@baseFontSize*1rem solid #D8D8D8;
        width: 50%;
        text-align: center;
        .px2rem(line-height,
        42);
        .px2rem(font-size,
        30);
        color: #666;
        padding: 28/@baseFontSize*1rem 0;
      }
      .table-cell:last-child {
        border: none;
      }
      .icon {
        display: inline-block;
        .px2rem(line-height,
        8);
        .px2rem(width,
        15);
        .px2rem(height,
        8);
        .px2rem(margin-right,
        10);
      }
      .icon.icon-up {
        background: url("../../assets/icon-up.png") no-repeat center;
        background-size: 100% 100%;
      }
      .icon.icon-down {
        background: url("../../assets/icon-down.png") no-repeat center;
        background-size: 100% 100%;
      }
    }
    .popup-remark {
      .popup-remark-phone {
        padding: 40/@baseFontSize*1rem 30/@baseFontSize*1rem;
        background-color: #fff;
        .popup-rp-text {
          .px2rem(line-height,
          42);
          .px2rem(font-size,
          30);
        }
        .popup-rp-phone {
          .px2rem(line-height,
          40);
          .px2rem(font-size,
          28);
          .px2rem(margin-top,
          12);
          color: #666;
        }
        .popup-rp-text-box {
          .px2rem(line-height,
          40);
          .px2rem(font-size,
          22);
          .px2rem(margin-top,
          12);
        }
      }
      .popup-cancel {
        background-color: #fff;
        .px2rem(line-height,
        100);
        .px2rem(font-size,
        36);
        .px2rem(margin-top,
        12);
      }
    }
  }
</style>