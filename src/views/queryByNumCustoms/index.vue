<template>
  <div class="queryFare" id="queryFare" @click="isBeginPortListShow=false,isEndPortListShow=false">
    <div class="top-select">
      <div class="top-port-box">
        <dl class="clearfix pos-r">
          <dt class="fl">起始港:</dt>
          <dd class="fl">
            <input type="text" placeholder="请选择起始港" @click.stop="isBeginPortListShow=true,isEndPortListShow=false">
          </dd>
          <div class="port-list" v-show="isBeginPortListShow">
            <div class="port-list-item" v-for="item in 5">
              <div class="port-li-inner">
                <span>SHANGHAI</span>
                <span class="port-list-chinese">上海</span>
              </div>
            </div>
          </div>
        </dl>
        <dl class="clearfix pos-r">
          <dt class="fl">目的港:</dt>
          <dd class="fl">
            <input type="text" placeholder="请选择目的港" @click.stop="isEndPortListShow=true,isBeginPortListShow=false">
          </dd>
          <div class="port-list" v-show="isEndPortListShow">
            <div class="port-list-item" v-for="item in 5">
              <div class="port-li-inner">
                <span>SHANGHAI</span>
                <span class="port-list-chinese">上海</span>
              </div>

            </div>
          </div>
        </dl>
      </div>
      <x-button type="primary" class="blue" @click.native="search">查询</x-button>
    </div>
    <div class="recently-search clearfix">
      <div class="left fl">最近查询</div>
      <div class="right fr">清除全部</div>
    </div>
    <ul class="history-ul">
      <li class="clearfix history-item" v-for="item in 3">
        <div class="fl">SHANGHAI - ROTTERDAM</div>
        <div class="fr delete">&nbsp;</div>
      </li>
    </ul>
  </div>
</template>
<script>
  import { XButton } from 'vux'
  export default {
    data() {
      return {
        isBeginPortListShow: false,
        isEndPortListShow: false
      }
    },
    mounted() {

    },
    methods: {
      search() {
        this.$router.push({ path: './queryFareResult' })
      }
    },
    components: {
      XButton
    },
    computed: {
    }
  }

</script>

<style lang="less" scoped>
  @import "./../../styles/var.less";
  .queryFare {
    height: 100%;
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