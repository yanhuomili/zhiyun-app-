<template>
  <div :class="['status-item',index==status?'is-current':index<status?'is-finish':'']">
    <div class="text-center inlin-block" style="position:relative">
      <div class="cicle-status inline-block"></div>
      <div class="cicle-min-box" style="position:absolute;left:68px;top:2px">
        <div class="table w100b">
          <div class="table-cell" v-for="item in 4">
            <div class="text-center">
              <div class="min-cicle">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="width:100%;display:inline-block;text-align:center" class="text-box">
      <div style="width:60px;display:inline-block;">
        <slot class="tt"></slot>
        <!-- <p>委托代理</p>
        <p>2017-11-27 17:52</p> -->
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        index: -1,
        width: 105
      }
    },
    mounted() {
      const steps = this.$parent.steps
      const index = steps.indexOf(this)
      if (index >= 0) {
        // steps.splice(index, 1);
        this.index = index
      }
    },
    computed: {
      status() {
        return this.$parent.value
      }
    },
    components: {

    },
    props: {
      value: {
        default: 0
      }
    },
    watch: {
    },
    beforeCreate() {
      this.$parent.steps.push(this)
    },
    beforeDestroy() {
      const steps = this.$parent.steps
      const index = steps.indexOf(this)
      if (index >= 0) {
        steps.splice(index, 1)
      }
    },
    methods: {
    }
  }

</script>

<style lang="scss" scoped>
  .status-item.is-finish {
    .cicle-status {
      border: 2px solid #6297F4;
    }
    .cicle-status:after {
      background-color: #6297F4;
    }
    .cicle-min-box {
      .min-cicle {
        background-color: #6297F4;
      }
    }
  }

  .status-item.is-current {
    .cicle-status {
      border: 2px solid #6297F4;
    }
    .cicle-status:after {
      background-color: #6297F4;
    }
    .text-box {
      color: #6297F4;
    }
  }

  .status-item:last-child .cicle-min-box {
    display: none;
  }

  .status-item {
    display: inline-block;
    width: 104px;
    vertical-align: top;
    .cicle-status {
      width: 20px;
      height: 20px;
      box-sizing: border-box;
      border: 2px solid #999;
      border-radius: 100% 100%;
      position: relative;
    }
    .cicle-status:after {
      content: '';
      display: block;
      position: absolute;
      width: 10px;
      height: 10px;
      top: 3px;
      left: 3px;
      background-color: #999;
      border-radius: 100% 100%;
    }
    .cicle-min-box {
      width: 72px;
      text-align: center;
      .min-cicle {
        width: 8px;
        height: 8px;
        display: inline-block;
        border-radius: 100% 100%;
        background-color: #999;
      }
    }
  }
</style>