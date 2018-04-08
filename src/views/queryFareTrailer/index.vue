<template>
  <div class="queryFareTrailer" id="queryFareTrailer" @click="isStartPortListShow=false,isTrailerDistrictShow=false,isTrailerLoadingPlaceShow=false">
    <div class="top-select">
      <div class="top-port-box">
        <dl class="clearfix pos-r">
          <dt class="fl">港&nbsp;&nbsp;口:</dt>
          <dd class="fl">
            <input type="text" placeholder="请选择港口" v-model="trailerStartPort" @click.stop="clickShippingStartPort" @blur="blurShippingStartPort">
          </dd>
          <select-port v-model="trailerStartPort" :isBeginPortListShow="isStartPortListShow" :startPortList="startPortList" @select="selectStartPort"
            ref="SelectPort"></select-port>
        </dl>
        <dl class="clearfix pos-r">
          <dt class="fl">区&nbsp;&nbsp;域:</dt>
          <dd class="fl">
            <input type="text" placeholder="请选择港口" v-model="trailerDistrict" @click.stop="clickTrailerDistrict" @blur="blurTrailerDistrict">
            <select-district v-model="trailerDistrict" :isBeginPortListShow="isTrailerDistrictShow" :startPortList="trailerDistrictList"
              @select="selectTrailerDistrict" ref="SelectDistrict1"></select-district>
          </dd>

        </dl>
        <dl class="clearfix pos-r">
          <dt class="fl">地&nbsp;&nbsp;址:</dt>
          <dd class="fl">
            <input type="text" placeholder="请选择港口" v-model="trailerLoadingPlace" @click.stop="clickTrailerLoadingPlace" @blur="blurTrailerLoadingPlace">
            <select-district v-model="trailerLoadingPlace" :isBeginPortListShow="isTrailerLoadingPlaceShow" :startPortList="trailerLoadingPlaceList"
              ref="SelectDistrict2"></select-district>
          </dd>
        </dl>
        <!-- <dl class="clearfix pos-r">
          <dt class="fl">区&nbsp;&nbsp;域:</dt>
          <dd class="fl">
            <input type="text" placeholder="请输入品名数量">
          </dd>
        </dl> -->
      </div>
      <x-button type="primary" class="blue" @click.native="search">查询</x-button>
    </div>
  </div>
</template>
<script>
  import { XButton } from 'vux'
  import SelectPort from '@/components/SelectPort'
  import SelectDistrict from '@/components/SelectDistrict'
  import { getAllStartPort, getTrailerDistrict, getTrailerLoadingPlace } from '@/api/checkFreightRateAPI.js'
  export default {
    data() {
      return {
        trailerStartPort: '',
        trailerDistrict: '',
        trailerLoadingPlace: '',
        isStartPortListShow: false,
        isTrailerDistrictShow: false,
        isTrailerLoadingPlaceShow: false,
        startPortList: [],
        trailerDistrictList: [],
        trailerLoadingPlaceList: [],
        trailerDistrictObj: {},
        trailerLoadingPlaceObj: {}
      }
    },
    mounted() {
      this.getAllStartPort()
      this.recoverMemorySelectCondition()
    },
    methods: {
      search() {
        if (!this.trailerStartPort || !this.trailerDistrict || !this.trailerLoadingPlace) {
          this.$vux.toast.text('请选择正确的港口或区域或地址')
          return false
        }
        const postData = {}
        postData.trailerStartPort = this.trailerStartPort
        postData.trailerDistrict = this.trailerDistrict
        postData.trailerLoadingPlace = this.trailerLoadingPlace
        postData.selectedService = 1
        postData.declareContainerType = '20GP,40GP,40HQ'
        this.$router.push({ path: '/queryFareTrailer', query: postData })
        this.$router.push({ path: './quoteTrailerDetail', query: postData })
      },
      recoverMemorySelectCondition() {
        if (JSON.stringify(this.$route.query) === '{}') {
          return false
        }
        this.trailerStartPort = this.$route.query.trailerStartPort
        this.trailerDistrict = this.$route.query.trailerDistrict
        this.trailerLoadingPlace = this.$route.query.trailerLoadingPlace
        this.getTrailerDistrict(this.trailerStartPort)
        this.getTrailerLoadingPlace(this.trailerStartPort, this.trailerDistrict)
      },
      async getAllStartPort() {
        try {
          const data = (await getAllStartPort()).data
          this.filterStartPortList = this.startPortList = data.data
        } catch (error) {
          throw new Error(error)
        }
      },
      //  根据拖车港口获取区域
      async getTrailerDistrict(portName) {
        try {
          let data = (await getTrailerDistrict({ params: { portName: portName } })).data
          if (data.returnCode == 0) {
            this.trailerDistrictObj[portName] = data.data
            this.trailerDistrictList = data.data
            // console.log(this.trailerDistrictObj[portName], 'this.trailerDistrictObj[portName]')
          }
        } catch (err) {
          throw Error(err, '请求出错')
        }
      },
      //  根据拖车区域获取loadingplace
      async getTrailerLoadingPlace(portName, district) {
        try {
          let data = (await getTrailerLoadingPlace({ params: { portName: portName, district: district } })).data
          if (data.returnCode == 0) {
            this.trailerLoadingPlaceObj[portName + district] = data.data
            this.trailerLoadingPlaceList = data.data
          }
        } catch (err) {
          throw Error(err, '请求出错')
        }
      },
      hideAllSelect() {
        this.isStartPortListShow = false
        this.isTrailerDistrictShow = false
        this.isTrailerLoadingPlaceShow = false
      },
      clickShippingStartPort() {
        this.hideAllSelect()
        this.isStartPortListShow = true
        if (this.startPortList.indexOf(this.trailerStartPort) > -1) {
          this.$refs.SelectPort.resetPortList()
        }
      },
      clickTrailerDistrict() {
        this.hideAllSelect()
        this.isTrailerDistrictShow = true
        if (this.trailerDistrictList.indexOf(this.trailerDistrict) > -1) {
          this.$refs.SelectDistrict1.resetPortList()
        }
      },
      clickTrailerLoadingPlace() {
        this.hideAllSelect()
        this.isTrailerLoadingPlaceShow = true
        if (this.trailerLoadingPlaceList.indexOf(this.trailerLoadingPlace) > -1) {
          this.$refs.SelectDistrict2.resetPortList()
        }
      },
      async blurShippingStartPort(e) {
        await sleep(30)
        if (this.startPortList.indexOf(e.target.value) < 0) {
          this.trailerStartPort = ''
        }
      },
      async blurTrailerDistrict(e) {
        await sleep(30)
        if (this.trailerDistrictList.indexOf(e.target.value) < 0) {
          this.trailerDistrict = ''
        }
      },
      async blurTrailerLoadingPlace(e) {
        await sleep(30)
        if (this.trailerLoadingPlaceList.indexOf(e.target.value) < 0) {
          this.trailerLoadingPlace = ''
        }
      },
      selectStartPort(val) {
        if (!this.trailerDistrictObj[val]) {
          this.getTrailerDistrict(val)
        } else {
          this.trailerDistrictList = this.trailerDistrictObj[val]
        }
        this.trailerDistrict = ''
        this.trailerLoadingPlace = ''
        this.trailerLoadingPlaceList = []
      },
      selectTrailerDistrict(val) {
        if (!this.trailerLoadingPlaceObj[this.trailerStartPort + val]) {
          this.getTrailerLoadingPlace(this.trailerStartPort, val)
        } else {
          this.trailerLoadingPlaceList = this.trailerLoadingPlaceObj[this.trailerStartPort + val]
        }
        this.trailerLoadingPlace = ''
      }
    },
    components: {
      XButton, SelectPort, SelectDistrict
    },
    computed: {
    }
  }

</script>

<style lang="less" scoped>
  @import "./../../styles/var.less";
  .queryFareTrailer {
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
        position: relative;
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