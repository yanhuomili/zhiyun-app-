<template>
  <div class="queryFareSea" id="queryFareSea" @click="isBeginPortListShow=false,isEndPortListShow=false">
    <div class="top-select">
      <div class="top-port-box">
        <dl class="clearfix pos-r">
          <dt class="fl">起始港:</dt>
          <dd class="fl">
            <input type="text" placeholder="请选择起始港" v-model="shippingStartPort" @click.stop="clickShippingStartPort" @blur="blurShippingStartPort">
          </dd>
          <select-port v-model="shippingStartPort" :isBeginPortListShow="isBeginPortListShow" :startPortList="startPortList" ref="SelectPort1"></select-port>
          <!-- <div class="port-list" v-show="isBeginPortListShow">
            <div class="port-list-item" :class="{ select: shippingStartPort==item }" v-for="item in filterStartPortList" @click="selectShippingStartPort(item)">
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
          <dt class="fl">目的港:</dt>
          <dd class="fl">
            <input type="text" placeholder="请选择目的港" v-model="shippingEndPort" @click.stop="clickShippingEndPort" @blur="blurShippingEndPort">
          </dd>
          <select-port v-model="shippingEndPort" :isBeginPortListShow="isEndPortListShow" :startPortList="endPortList" ref="SelectPort2"></select-port>
          <!-- <div class="port-list" v-show="isEndPortListShow">
            <div class="port-list-item" :class="{ select: shippingEndPort==item }" v-for="item in filterEndPortList" @click="selectShippingEndPort(item)">
              <div class="port-li-inner">
                <span>SHANGHAI</span>
                <span class="port-list-chinese">{{item}}</span>
              </div>
            </div>
            <div class="port-list-item" v-show="!filterEndPortList[0]">
              <div class="port-li-inner">
                <span class="port-list-chinese">无匹配数据</span>
              </div>
            </div>
          </div> -->
        </dl>
      </div>
      <x-button type="primary" class="blue" @click.native="search">查询</x-button>
    </div>
    <div class="recently-search clearfix">
      <div class="left fl">最近查询</div>
      <div class="right fr" @click="clearSearchHistory">清除全部</div>
    </div>
    <div class="history-ul-box-ab">
      <div class="history-ul-box">
        <ul class="history-ul">
          <li class="clearfix history-item" v-for="(item,index) in searchHistoryData" @click="selectSearchHistory(item)">
            <div class="fl">{{item.startPort}} - {{item.endPort}}</div>
            <div class="fr delete" @click.stop="deleteSearchHistory(index)">&nbsp;</div>
          </li>
        </ul>
        <ul class="history-ul" v-show="!searchHistoryData[0]">
          <div class="clearfix history-item">
            <div class="text-center">暂无数据</div>
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import { XButton } from 'vux'
  import SelectPort from '@/components/SelectPort'
  import { getAllStartPort, getEndPortByName } from '@/api/checkFreightRateAPI.js'
  export default {
    data() {
      return {
        isBeginPortListShow: false,
        isEndPortListShow: false,
        shippingStartPort: '',
        shippingEndPort: '',
        startPortList: [],
        // filterStartPortList: [],
        endPortList: [],
        // filterEndPortList: [],
        searchHistoryData: JSON.parse(localStorage.getItem('queryFareSeaSEPort') || '[]')
      }
    },
    mounted() {
      this.recoverMemorySelectCondition()
      this.getAllStartPort()
      this.getEndPortByName()
    },
    methods: {
      search() {
        if (this.shippingStartPort && this.shippingEndPort) {
          this.remeberSearchHistory()
        } else {
          return false
        }
        const postData = {}
        postData.shippingStartPort = this.shippingStartPort
        postData.shippingEndPort = this.shippingEndPort
        this.$router.push({ path: '/queryFareSea', query: postData })
        this.$router.push({ path: './queryFareSeaResult', query: postData })
      },
      recoverMemorySelectCondition() {
        if (JSON.stringify(this.$route.query) === '{}') {
          return false
        }
        this.shippingStartPort = this.$route.query.shippingStartPort
        this.shippingEndPort = this.$route.query.shippingEndPort
      },
      async getAllStartPort() {
        try {
          const data = (await getAllStartPort()).data
          this.filterStartPortList = this.startPortList = data.data
        } catch (error) {
          throw new Error(error)
        }
      },
      async getEndPortByName() {
        try {
          const data = (await getEndPortByName()).data
          this.filterEndPortList = this.endPortList = data.data
        } catch (error) {
          throw new Error(error)
        }
      },
      // selectShippingStartPort(item) {
      //   this.shippingStartPort = item
      // },
      // selectShippingEndPort(item) {
      //   this.shippingEndPort = item
      // },
      selectSearchHistory(item) {
        this.shippingStartPort = item.startPort
        this.shippingEndPort = item.endPort
      },
      remeberSearchHistory() {
        let isMember = false
        this.searchHistoryData.forEach((v, k) => {
          if ((v.startPort === this.shippingStartPort) && (v.endPort === this.shippingEndPort)) {
            isMember = true
          }
        })
        if (isMember) {
          return false
        }
        this.searchHistoryData.unshift({ startPort: this.shippingStartPort, endPort: this.shippingEndPort })
        this.setStorageSearchHistory(this.shippingStartPort, this.shippingEndPort)
      },
      deleteSearchHistory(index) {
        this.searchHistoryData.splice(index, 1)
        this.deleteStorageSearchHistory(index)
      },
      clearSearchHistory() {
        this.searchHistoryData = []
        localStorage.setItem('queryFareSeaSEPort', '')
      },
      getStorageSearchHistory() {
        const his = localStorage.getItem('queryFareSeaSEPort') || '[]'
        return JSON.parse(his)
      },
      setStorageSearchHistory(startPort, endPort) {
        const his = this.getStorageSearchHistory()
        his.unshift({ startPort: startPort, endPort: endPort })
        localStorage.setItem('queryFareSeaSEPort', JSON.stringify(his))
      },
      deleteStorageSearchHistory(index) {
        const his = this.getStorageSearchHistory()
        his.splice(index, 1)
        localStorage.setItem('queryFareSeaSEPort', JSON.stringify(his))
      },
      async blurShippingStartPort(e) {
        await sleep(30)
        if (this.startPortList.indexOf(e.target.value) < 0) {
          this.shippingStartPort = ''
        }
      },
      async blurShippingEndPort(e) {
        await sleep(30)
        if (this.endPortList.indexOf(e.target.value) < 0) {
          this.shippingEndPort = ''
        }
      },
      clickShippingStartPort() {
        this.isBeginPortListShow = true
        this.isEndPortListShow = false
        if (this.startPortList.indexOf(this.shippingStartPort) > -1) {
          this.$refs.SelectPort1.resetPortList()
        }
      },
      clickShippingEndPort() {
        this.isEndPortListShow = true
        this.isBeginPortListShow = false
        if (this.endPortList.indexOf(this.shippingEndPort) > -1) {
          this.$refs.SelectPort2.resetPortList()
        }
      }
    },
    components: {
      XButton, SelectPort
    },
    watch: {
      //  根据输入的起始港显示下拉港口
      shippingStartPort(val) {
        if (!val) {
          this.filterStartPortList = this.startPortList
        } else {
          this.filterStartPortList = this.startPortList.filter((v, k) => {
            return v.indexOf(val) > -1
          })
        }
      },
      //  根据输入的目的港显示下拉港口
      shippingEndPort(val) {
        if (!val) {
          this.filterEndPortList = this.endPortList
        } else {
          this.filterEndPortList = this.endPortList.filter((v, k) => {
            return v.indexOf(val) > -1
          })
        }
      }
    },
    computed: {
      // filterStartPortList() {
      //   if (!this.shippingStartPort) {
      //     return this.startPortList
      //   } else {
      //     return this.startPortList.filter((v, k) => {
      //       console.log(this.shippingStartPort, v)
      //       return v.indexOf(this.shippingStartPort) > -1
      //     })
      //   }
      // }
    }
  }

</script>

<style lang="less" scoped>
  @import "./../../styles/var.less";
  .queryFareSea {
    height: 100%;
    position: relative;
    .top-select {
      background-color: #fff;
      .px2rem(padding-bottom, 48);
    }
    .top-port-box {
      margin: 0 auto;
      .px2rem(width, 446);
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
        .px2rem(max-height, 540);
        overflow: scroll;
        .port-list-item {
          padding: 0 30/@baseFontSize*1rem;
        }
        .port-list-item.select {
          color: #6297F4;
          .port-list-chinese {
            color: #6297F4;
          }
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
        .px2rem(width, 144);
      }
      dd {
        border-bottom: 1/@baseFontSize*1rem solid #ddd;
        .px2rem(width, 300);
      }
      dl+dl {
        .px2rem(margin-top, 18);
      }
      input {
        .px2rem(width, 264);
        /* width: 100%; */
        /* text-align: center; */
        .px2rem(font-size, 36);
        vertical-align: baseline;
        border: none;
        outline: none;
        .px2rem(padding-left, 34);
      }
    }
    .weui-btn {
      .px2rem(width, 538);
      .px2rem(font-size, 38);
      .px2rem(margin-top, 34);
    }
    .recently-search {
      .px2rem(line-height, 104);
      .px2rem(font-size, 34);
      .fl {
        color: #666;
        .px2rem(margin-left, 30);
      }
      .fr {
        .px2rem(margin-right, 20);
        .px2rem(font-size, 28);
        color: #6297F4;
      }
    }
    .history-ul-box-ab {
      position: absolute;
      width: 100%;
      .px2rem(top, 526);
      bottom: 0;
      overflow: hidden;
    }
    .history-ul-box {
      overflow: scroll;
      height: 100%;
    }
    .history-ul {
      background-color: #fff;
      .px2rem(padding-left, 30);
      .history-item {
        .px2rem(line-height, 86);
        .px2rem(font-size, 28);
        color: #999;
        border-bottom: 1/@baseFontSize*1rem solid #ddd;
      }
      .history-item:last-child {
        border: none;
      }
      .delete {
        .px2rem(width, 34);
        .px2rem(height, 34);
        .px2rem(margin-top, 26);
        .px2rem(margin-right, 46);
        background: url("../../assets/delete.png") no-repeat center;
        background-size: 100% 100%;
      }
    }
  }
</style>