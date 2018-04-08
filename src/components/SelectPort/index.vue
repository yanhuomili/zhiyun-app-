<template>
  <div class="port-list" v-show="isBeginPortListShow">
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
  </div>
</template>

<script>
  export default {
    data() {
      return {
        shippingStartPort: '',
        filterStartPortList: this.startPortList
      }
    },
    mounted() {
    },
    computed: {
    },
    components: {

    },
    props: {
      // 港口
      value: {
        default: ''
      },
      // 过滤前的港口列表
      startPortList: {
        type: Array,
        default: []
      },
      // 是否显示下拉
      isBeginPortListShow: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      value(val) {
        this.shippingStartPort = val
      },
      startPortList() {
        this.filterStartPortList = this.startPortList
      },
      // shippingStartPort(val) {
      //   this.$emit('input', val)
      // },
      //  根据输入的起始港显示下拉港口
      shippingStartPort(val) {
        if (!val) {
          this.filterStartPortList = this.startPortList
        } else {
          this.filterStartPortList = this.startPortList.filter((v, k) => {
            return v.indexOf(val) > -1
          })
        }
        this.$emit('input', val)
      }
    },
    methods: {
      selectShippingStartPort(item) {
        this.shippingStartPort = item
        this.$emit('select', item)
      },
      resetPortList() {
        this.filterStartPortList = this.startPortList
      }
    }
  }

</script>
<style lang="less" scoped>
  @import "./../../styles/var.less";
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
</style>