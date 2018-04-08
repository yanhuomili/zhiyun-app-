<template>
  <div class="quoteCustomsDetail" id="quoteCustomsDetail">
    <div class="quote-info">
      <div class="all-price">
        ¥{{quoteData.defaultRmbTotal}}
      </div>
      <div class="quote-detail">
        <dl class="clearfix quote-detail-dl">
          <dt class="fl">报关地：</dt>
          <dd class="fl">{{quoteData.declarePlace}}</dd>
        </dl>
        <dl class="clearfix quote-detail-dl">
          <dt class="fl">品名数量：</dt>
          <dd class="fl">{{quoteData.productQuantity}}</dd>
        </dl>
      </div>
    </div>
    <div class="interval-bg">
    </div>
    <div class="quote-price">
      <table>
        <tbody>
          <!-- <tr class="tr" v-for="item in 5">
            <td class="td-icon-doller">
              <div class="icon-doller rmb">&nbsp;</div>
            </td>
            <td class="td-price-all">
              <div class="price-all-top">海运费(OceanFreight)</div>
              <div class="price-all-price">675/1250/1250/1250</div>
            </td>
            <td class="td-price-one">
              <div class="price-one">
                1250
              </div>
            </td>
          </tr> -->
          <tr class="tr" v-for="(value,key) in surchargeRouteServiceVOList">
            <td class="td-icon-doller">
              <div class="icon-doller rmb">&nbsp;</div>
            </td>
            <td class="td-price-all">
              <div class="price-all-top">{{key}}</div>
              <div class="price-all-price" v-if="value['20GP']">{{value['20GP']}}/{{value['40GP']}}/{{value['40HQ']}}/{{value['45HQ']}}</div>
              <div class="price-all-price" v-else>{{value}}</div>
            </td>
            <td class="td-price-one">
              <div class="price-one" v-if="value['20GP']">
                {{value['20GP']}}
              </div>
              <div class="price-one" v-else>
                {{value}}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <footer-remark v-model="quoteData.customsRemark"></footer-remark>
  </div>
</template>
<script>
  import { Popup } from 'vux'
  import FooterRemark from '@/components/FooterRemark'
  import { getQuoteShow } from '@/api/quoteAPI'
  export default {
    data() {
      return {
        isServiceTelShow: false,
        isRemarkShow: false,
        quoteData: { customsQuoteTmpVOList: [] },
        surchargeRouteServiceVOList: {}
      }
    },
    mounted() {
      this.getQuoteShow()
    },
    methods: {
      async getQuoteShow() {
        try {
          const postData = { ...this.$route.query }
          postData.containerInputVOList = [{ containerName: "20GP", quantity: 1 }, { containerName: "40GP", quantity: 1 }, { containerName: "40HQ", quantity: 1 }, { containerName: "45HQ", quantity: 1 }]
          console.log(postData)
          const data = (await getQuoteShow({ data: postData })).data
          if (data.returnCode === 0) {
            this.quoteData = data.data
            this.surchargeRouteServiceVOList = this.covertSurcharge(data.data.customsQuoteTmpVOList)
          }
          console.log(data)
        } catch (error) {
          throw new Error()
        }
      },
      covertSurcharge(surchargeRouteServiceVOList) {
        const midSet = {}
        surchargeRouteServiceVOList.forEach((v, k) => {
          if (v.sign) {
            const name = v.englishName.slice(0, v.englishName.lastIndexOf('_'))
            if (!midSet[name]) {
              midSet[name] = {}
            }
            midSet[name][v.sign] = v.price
          } else {
            midSet[v.englishName] = v.price
          }
        })
        console.log(midSet)
        return midSet
      }
    },
    components: {
      Popup, FooterRemark
    },
    computed: {
    }
  }

</script>
<style>
</style>

<style lang="less" scoped>
  @import "./../../styles/var.less";
  .quoteCustomsDetail {
    height: 100%;
    background-color: #fff;
    .quote-info {
      .px2rem(padding, 30);
      .all-price {
        .px2rem(line-height, 50);
        .px2rem(font-size, 36);
        color: #6297F4;
      }
      .quote-detail {
        color: #666;
        .px2rem(font-size, 28);
        .px2rem(line-height, 40);
        .quote-detail-dl {
          .px2rem(margin-top, 4);
        }
        .quote-detail-dl:first-child {
          .px2rem(margin-top, 8);
        }
        dd {
          .px2rem(margin-left, 10);
        }
      }
    }
    .interval-bg {
      .px2rem(height, 30);
      background-color: #EBEBEB;
    }
    .quote-price {
      table {
        width: 100%;
        border-collapse: collapse;
        td {
          position: relative;
        }
      }
      .td-icon-doller {
        padding: 20/@baseFontSize*1rem 30/@baseFontSize*1rem;
        .px2rem(width, 90);
      }
      .price-all-top {
        .px2rem(font-size, 28);
        .px2rem(line-height, 40);
      }
      .price-all-price {
        .px2rem(font-size, 24);
        .px2rem(line-height, 34);
        color: #999;
      }
      .icon-doller {
        .px2rem(width, 60);
        .px2rem(height, 60);
      }
      .price-one {
        color: #6297F4;
        .px2rem(font-size, 36);
        .px2rem(line-height, 50);
      }
      .td-icon-doller:after {
        content: "";
        position: absolute;
        width: 100%;
        height: 1px;
        background-color: #ddd;
        bottom: 0;
        .px2rem(left, 30);
      }
      .td-price-all:after,
      .td-price-one:after {
        content: "";
        position: absolute;
        width: 100%;
        height: 1px;
        background-color: #ddd;
        bottom: 0;
        left: 0;
      }
      .icon-doller.dollar {
        background: url("../../assets/icon-dollar.png");
        background-size: 100% 100%;
      }
      .icon-doller.rmb {
        background: url("../../assets/icon-rmb.png");
        background-size: 100% 100%;
      }
    }
  }
</style>