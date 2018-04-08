<template>
  <div class="queryFareResult" id="queryFareResult">
    <div class="result-list-box">
      <div class="result-list" style="height:100%">
        <scroller lock-x @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="-300" height="100%">
          <div class="box2">
            <table>
              <tbody>
                <tr class="tr" v-for="item in scheduleBaseInfoList" v-show="scheduleBaseInfoList.length>0" @click="gotoQuoteSeaDetail(item.id,item.firstStartPort,item.secondEndPort)">
                  <td class="td-logo">
                    <div class="boat-company-logo">&nbsp;</div>
                  </td>
                  <td class="text-center td-price">
                    <div class="price">{{item.containerTypeRouteServiceVOList[0].price}}</div>
                    <div class="info">洋三</div>
                  </td>
                  <td class="text-center td-price">
                    <div class="price">{{item.containerTypeRouteServiceVOList[1].price}}</div>
                    <div class="info">直达35天</div>
                  </td>
                  <td class="text-center td-price">
                    <div class="price">{{item.containerTypeRouteServiceVOList[2].price}}</div>
                    <div class="info">周二</div>
                  </td>
                  <td class="text-center td-time">
                    <div class="time">
                      <div class="time-begin">04/14</div>
                      <div class="time-mid">-</div>
                      <div class="time-end">04/30</div>
                    </div>
                  </td>
                </tr>
                <tr class="text-center no-data" v-show="!isHasData">
                  <td colspan="5">没有更多数据了</td>
                </tr>
              </tbody>
            </table>
            <load-more tip="loading" v-show="isHasData"></load-more>
            <div class="text-center no-data" v-show="scheduleBaseInfoList.length==0&&!onFetching">暂无数据</div>
          </div>
        </scroller>
        <!-- <table>
          <tbody>
            <tr class="tr" v-for="item in scheduleBaseInfoList" v-show="scheduleBaseInfoList.length>0" @click="gotoQuoteSeaDetail(item.id,item.firstStartPort,item.secondEndPort)">
              <td class="td-logo">
                <div class="boat-company-logo">&nbsp;</div>
              </td>
              <td class="text-center td-price">
                <div class="price">{{item.containerTypeRouteServiceVOList[0].price}}</div>
                <div class="info">洋三</div>
              </td>
              <td class="text-center td-price">
                <div class="price">{{item.containerTypeRouteServiceVOList[1].price}}</div>
                <div class="info">直达35天</div>
              </td>
              <td class="text-center td-price">
                <div class="price">{{item.containerTypeRouteServiceVOList[2].price}}</div>
                <div class="info">周二</div>
              </td>
              <td class="text-center td-time">
                <div class="time">
                  <div class="time-begin">04/14</div>
                  <div class="time-mid">-</div>
                  <div class="time-end">04/30</div>
                </div>
              </td>
            </tr>
            <tr class="text-center no-data" v-show="scheduleBaseInfoList.length==0">
              暂无数据
            </tr>
          </tbody>
        </table> -->
      </div>
    </div>
    <div class="sort-box table">
      <div class="table-cell">
        <i class="icon icon-extend">&nbsp;</i>
        中转/直达</div>
      <div class="table-cell">
        <i class="icon icon-arrows icon-arrows-down">&nbsp;</i>价格</div>
      <div class="table-cell">
        <i class="icon icon-arrows icon-arrows-up">&nbsp;</i>航程</div>
    </div>
  </div>
</template>
<script>
  import { XButton, Scroller, LoadMore } from 'vux'
  import { getScheduleBaseInfoQuery } from '@/api/checkFreightRateAPI'
  export default {
    data() {
      return {
        scheduleBaseInfoList: [],
        pagination: {
          page: 1,
          pageSize: 10,
          totalSize: 10
        },
        onFetching: true,
        isHasData: true,
        chooseCondition: {}
      }
    },
    mounted() {
      this.getScheduleBaseInfoList()
      // this.$vux.toast.show({ text: 'Loading', position: 'middle', type: 'warn', time: 2000 })
      // this.$message({ message: 'haode', type: 'error' })
    },
    methods: {
      gotoQuoteSeaDetail(impQuoteTmpId, startPort, endPort) {
        this.chooseCondition.impQuoteTmpId = impQuoteTmpId
        this.$router.push({ path: './quoteSeaDetail', query: this.chooseCondition })
      },
      async getScheduleBaseInfoList() {
        const postData = {
          shippingStartPort: '',
          shippingEndPort: '',
          // shippingStartPort: this.$route.query.shippingStartPort,
          // shippingEndPort: this.$route.query.shippingEndPort,
          selectedService: 0,
          shippingContainerType: '20GP,40GP,40HQ,45HQ'
        }
        this.chooseCondition = postData
        try {
          const data = (await getScheduleBaseInfoQuery({ data: postData, params: { page: this.pagination.page } })).data
          if (data.returnCode == 0) {
            if (data.data.dataList.length < data.data.pageSize) {
              this.isHasData = false
            }
            data.data.dataList.forEach((v, k) => {
              this.scheduleBaseInfoList.push(v)
            })
            this.onFetching = false
            // this.resultServiceType = JSON.parse(JSON.stringify(this.searchData.serviceType))
            // this.scheduleBaseInfoList = data.data.dataList || []
            // this.pagination = {
            //   page: data.data.currentPage,
            //   pageSize: data.data.pageSize,
            //   totalSize: data.data.totalSize||1
            // }
          }
        } catch (err) {
          throw Error(err, '请求出错')
        }
      },
      onScrollBottom() {
        if (!this.isHasData) {
          return false
        }
        if (this.onFetching) {
          // do nothing
        } else {
          this.onFetching = true
          this.pagination.page++
          this.getScheduleBaseInfoList()
          setTimeout(() => {
            this.$refs.scrollerBottom.reset()
          }, 500)
          // this.$nextTick(() => {

          // })
        }
      },
    },
    components: {
      XButton, Scroller, LoadMore
    },
    computed: {
    }
  }

</script>

<style lang="less" scoped>
  @import "./../../styles/var.less";
  .queryFareResult {
    height: 100%;
    position: relative;
    background-color: #FFF;
    .result-list-box {
      position: absolute;
      top: 0;
      .px2rem(bottom, 100);
      width: 100%;
      overflow: hidden;
    }
    .result-list {

      table {
        width: 100%;
        border-collapse: collapse;
      }
      td {
        padding: 28/@baseFontSize*1rem 0;
        position: relative;
      }
      .tr {
        .px2rem(padding-left, 30);
        /* border-bottom: 1/@baseFontSize*1rem solid #ddd; */
      }
      .tr:active {
        background-color: #ebebeb;
      }

      /* .tr:last-child {
        border: none;
      } */
      .td-logo {
        .px2rem(padding-left, 30);
        .px2rem(width, 92);
      }
      .td-logo:after {
        content: "";
        position: absolute;
        width: 100%;
        height: 1px;
        background-color: #ddd;
        bottom: 0;
        .px2rem(left, 30);
      }
      .td-price {
        .px2rem(width, 126);
      }
      .td-price:after,
      .td-time:after {
        content: "";
        position: absolute;
        width: 100%;
        height: 1px;
        background-color: #ddd;
        bottom: 0;
        left: 0;
      }
      .boat-company-logo {
        .px2rem(width, 72);
        .px2rem(height, 60);
        background-color: #000;
      }
      .price {
        color: #6297F4;
        .px2rem(font-size, 36);
        .px2rem(line-height, 50);
      }
      .info {
        color: #666;
        .px2rem(font-size, 20);
        .px2rem(line-height, 28);
      }
      .time {
        color: #666;
        .px2rem(font-size, 18);
        .px2rem(line-height, 18);
      }
    }
    .no-data {
      color: #666;
      .px2rem(font-size, 26);
    }
    .sort-box {
      position: absolute;
      bottom: 0;
      width: 100%;
      background-color: #F7F7FA;
      border-top: 1/@baseFontSize*1rem solid #D8D8D8;
      .table-cell {
        border-right: 1/@baseFontSize*1rem solid #D8D8D8;
        width: 33.3%;
        text-align: center;
        .px2rem(line-height, 42);
        .px2rem(font-size, 30);
        color: #666;
        padding: 28/@baseFontSize*1rem 0;
      }
      .table-cell:last-child {
        border: none;
      }
      .icon {
        display: inline-block;
        .px2rem(margin-right, 10);
      }
      .icon-extend {
        .px2rem(line-height, 12);
        .px2rem(width, 16);
        .px2rem(height, 12);
        background: url("../../assets/icon-extend.png") no-repeat center;
        background-size: 100% 100%;
      }
      .icon-arrows {
        .px2rem(line-height,
        20);
        .px2rem(width,
        12);
        .px2rem(height,
        20);
      }
      .icon-arrows.icon-arrows-up {
        background: url("../../assets/icon-arrows-up.png") no-repeat center;
        background-size: 100% 100%;
      }
      .icon-arrows.icon-arrows-down {
        background: url("../../assets/icon-arrows-down.png") no-repeat center;
        background-size: 100% 100%;
      }
    }
    .vux-loadmore {
      width: 100%;
      padding: 0.5rem 0;
      margin: 0
    }
  }
</style>