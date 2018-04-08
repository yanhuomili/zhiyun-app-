<template>
  <div class="queryFareCustoms" id="queryFareCustoms" @click="isBeginPortListShow=false">
    <div class="top-select">
      <div class="top-port-box">
        <dl class="clearfix pos-r">
          <dt class="fl">起始港:</dt>
          <dd class="fl">
            <input type="text" placeholder="请选择报关地" v-model="declarePlace" @click.stop="clickdeclarePlace" @blur="blurdeclarePlace">
          </dd>
          <select-port v-model="declarePlace" :isBeginPortListShow="isBeginPortListShow" :startPortList="startPortList" ref="SelectPort"></select-port>
          <!-- <div class="port-list" v-show="isBeginPortListShow">
            <div class="port-list-item" :class="{ select: declarePlace==item }" v-for="item in filterStartPortList" @click="selectdeclarePlace(item)">
              <div class="port-li-inner">
                <span>SHANGHAI</span>
                <span class="port-list-chinese">{{item}}</span>
              </div>
            </div>
            <div class="port-list-item" v-show="!filterStartPortList[0]">
              <div class="port-li-inner">
                <span class="port-list-chinese">无匹配数据</span>
              </div>
            </div>
          </div> -->
        </dl>
        <dl class="clearfix pos-r">
          <dt class="fl">品名数量:</dt>
          <dd class="fl">
            <input type="text" placeholder="请输入品名数量" v-model="productQuantity">
          </dd>
        </dl>
      </div>
      <x-button type="primary" class="blue" @click.native="search">查询</x-button>
    </div>
  </div>
</template>
<script>
  import { XButton } from 'vux'
  import SelectPort from '@/components/SelectPort'
  import { getAllStartPort } from '@/api/checkFreightRateAPI.js'
  export default {
    data() {
      return {
        isBeginPortListShow: false,
        isEndPortListShow: false,
        declarePlace: '',  //  报关地
        productQuantity: '', // 品名数量
        declareContainerType: '',  // 报关的柜型
        startPortList: [],
        filterStartPortList: [],
      }
    },
    mounted() {
      this.getAllStartPort()
    },
    methods: {
      search() {
        const postData = {}
        postData.declarePlace = this.declarePlace
        postData.productQuantity = this.productQuantity
        postData.selectedService = 2
        postData.declareContainerType = '20GP,40GP,40HQ'
        console.log(postData)
        this.$router.push({ path: './quoteCustomsDetail', query: postData })
        // this.$router.push({ path: './quoteCustomsDetail' })
      },
      async getAllStartPort() {
        try {
          const data = (await getAllStartPort()).data
          this.filterStartPortList = this.startPortList = data.data
        } catch (error) {
          throw new Error(error)
        }
      },
      clickdeclarePlace() {
        this.isBeginPortListShow = true
        if (this.startPortList.indexOf(this.declarePlace) > -1) {
          this.$refs.SelectPort.resetPortList()
        }
      },
      async blurdeclarePlace(e) {
        await sleep(30)
        if (this.startPortList.indexOf(e.target.value) < 0) {
          this.declarePlace = ''
        }
      },
      // selectdeclarePlace(item) {
      //   this.declarePlace = item
      // },
      // selectStartPort(val) {
      //   if (!this.trailerDistrictObj[val]) {
      //     this.getTrailerDistrict(val)
      //   } else {
      //     this.trailerDistrictList = this.trailerDistrictObj[val]
      //   }
      //   this.trailerDistrict = ''
      //   this.trailerLoadingPlace = ''
      //   this.trailerLoadingPlaceList = []
      // },
    },
    watch: {
      //  根据输入的起始港显示下拉港口
      declarePlace(val) {
        if (!val) {
          this.filterStartPortList = this.startPortList
        } else {
          this.filterStartPortList = this.startPortList.filter((v, k) => {
            return v.indexOf(val) > -1
          })
        }
      }
    },
    components: {
      XButton, SelectPort
    },
    computed: {
    }
  }

</script>

<style lang="less" scoped>
  @import "./../../styles/var.less";
  .queryFareCustoms {
    height: 100%;
    background-color: #fff;
    .top-select {
      background-color: #fff;
      .px2rem(padding-bottom, 48);
    }
    .top-port-box {
      margin: 0 auto;
      .px2rem(width, 486);
      .px2rem(padding-top, 35);
      dl {
        .px2rem(font-size, 36);
        .px2rem(line-height, 50);
      }
      .port-list {
        position: absolute;
        border: 1/@baseFontSize*1rem solid #ddd;
        .px2rem(width, 540);
        top: 99%;
        .px2rem(left, 30);
        z-index: 1;
        background-color: #fff;
        .port-list-item {
          padding: 0 30/@baseFontSize*1rem;
        }
        .port-list-item:active {
          background-color: #EBEBEB;
        }
        .port-li-inner {
          width: 100%;
          margin: 0 auto;
          border-bottom: 1/@baseFontSize*1rem solid #ddd;
          .px2rem(line-height, 86);
        }
        .port-list-item:last-child .port-li-inner {
          border-bottom: none;
        }
        .port-list-chinese {
          color: #666;
          .px2rem(margin-left, 30);
        }
      }
      dt,
      dd {
        .px2rem(padding-top, 25);
        .px2rem(padding-bottom, 25);
      }
      dt {
        .px2rem(width, 180);
        text-align: right;
      }
      dd {
        .px2rem(margin-left, 10);
        border-bottom: 1/@baseFontSize*1rem solid #ddd;
        .px2rem(width, 290);
      }
      dl+dl {
        .px2rem(margin-top, 18);
      }
      input {
        .px2rem(width, 234);
        /* width: 100%; */
        /* text-align: center; */
        .px2rem(font-size, 28);
        vertical-align: baseline;
        border: none;
        outline: none;
        .px2rem(padding-left, 34);
      }
    }
    .weui-btn {
      .px2rem(width, 538);
      .px2rem(font-size, 38);
      .px2rem(margin-top, 180);
    }
  }
</style>