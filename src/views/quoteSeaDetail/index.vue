<template>
  <div class="quoteDetail" id="quoteDetail">
    <div class="quote-info">
      <div class="port-to-port">
        {{quoteData.startPortName}}-{{quoteData.endPortName}}
      </div>
      <div class="quote-detail">
        <dl class="clearfix quote-detail-dl">
          <dt class="fl">承运人：</dt>
          <dd class="fl">{{quoteData.shipCompany}}</dd>
        </dl>
        <dl class="clearfix quote-detail-dl">
          <dt class="fl">中转方式：</dt>
          <dd class="fl">中转{{quoteData.transitPort}}</dd>
        </dl>
        <dl class="clearfix quote-detail-dl">
          <dt class="fl">航名/航次：</dt>
          <dd class="fl">ABC/748W</dd>
        </dl>
        <dl class="clearfix quote-detail-dl">
          <dt class="fl">预计开船日期：</dt>
          <dd class="fl">2018-3-22</dd>
        </dl>
      </div>
    </div>
    <div class="interval-bg">
    </div>
    <div class="quote-price-box">
      <div class="quote-price">
        <table>
          <tbody>
            <tr class="tr" v-if="quoteData.quoteContainerTypeVOList">
              <td class="td-icon-doller">
                <div class="icon-doller rmb">&nbsp;</div>
              </td>
              <td class="td-price-all">
                <div class="price-all-top">海运费(OceanFreight)</div>
                <div class="price-all-price">{{quoteData.quoteContainerTypeVOList[0].price}}/{{quoteData.quoteContainerTypeVOList[1].price}}/{{quoteData.quoteContainerTypeVOList[2].price}}/{{quoteData.quoteContainerTypeVOList[3].price}}</div>
              </td>
              <td class="td-price-one">
                <div class="price-one">
                  {{quoteData.quoteContainerTypeVOList[0].price}}
                </div>
              </td>
            </tr>
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
            <!-- <tr class="tr" v-for="item in quoteData.surchargeRouteServiceVOList" :key="item.englishName">
              <td class="td-icon-doller">
                <div class="icon-doller rmb">&nbsp;</div>
              </td>
              <td class="td-price-all">
                <div class="price-all-top" v-if="!item.sign">{{item.englishName}}</div>
                <div class="price-all-top" v-else>{{item.englishName.slice(0, item.englishName.lastIndexOf('_'))}}({{item.sign.substr(0,2)+'`'+item.sign.substr(2,4)}})</div>
                <div class="price-all-price">{{item.price}}</div>
              </td>
              <td class="td-price-one">
                <div class="price-one">
                  {{item.price}}
                </div>
              </td>
            </tr> -->
          </tbody>
        </table>
      </div>
    </div>
    <footer-remark v-model="quoteData.shippingRemark"></footer-remark>
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
        quoteData: {},
        queryData: {
        },
        surchargeRouteServiceVOList: {}
      }
    },
    mounted() {
      this.getQuoteShow(this.$route.query.impQuoteTmpId)
    },
    components: {
      Popup, FooterRemark
    },
    methods: {
      async getQuoteShow(impQuoteTmpId) {
        const postData = { ...this.$route.query }
        delete postData.impQuoteTmpId
        postData.containerInputVOList = [{ containerName: "20GP", quantity: 1 }, { containerName: "40GP", quantity: 1 }, { containerName: "40HQ", quantity: 1 }, { containerName: "45HQ", quantity: 1 }]
        this.queryData = postData
        try {
          const data = (await getQuoteShow({ params: { impQuoteTmpId: impQuoteTmpId }, data: postData })).data
          if (data.returnCode === 0) {
            this.quoteData = data.data
            this.surchargeRouteServiceVOList = this.covertSurcharge(data.data.surchargeRouteServiceVOList)
          }
        } catch (error) {
          throw Error(error)
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
    computed: {
    }
  }

</script>
<style>
</style>

<style lang="less" scoped>
  @import "./../../styles/var.less";
  .quoteDetail {
    height: 100%;
    background-color: #fff;
    .quote-info {
      .px2rem(padding, 30);
      .port-to-port {
        .px2rem(line-height, 42);
        .px2rem(font-size, 30);
        color: #333;
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
    .quote-price-box {
      position: absolute;
      .px2rem(top, 310);
      .px2rem(bottom, 100);
      width: 100%;
      overflow: hidden;
    }
    .quote-price {
      height: 100%;
      overflow: scroll;
      table {
        width: 100%;
        border-collapse: collapse;
        td {
          position: relative;
        }
      }
      .tr:last-child {
        .td-icon-doller:after,
        .td-price-all:after,
        .td-price-one:after {
          height: 0;
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