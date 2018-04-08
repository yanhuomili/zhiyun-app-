<template>
  <div :class="['od-step',index==status?'is-current':index<status?'is-finish':'']">
    <div class="od-step-top">
      <div class="od-num-box">
        {{index+1}}
      </div>
      <div class="od-main-text">
        <slot name="title"></slot>
      </div>
      <div class="od-line"></div>
    </div>
    <div class="od-step-bottom">
      <slot name="info"></slot>
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
  .od-step {
    font-size: 0;
    color: #666;
    display: inline-block;
    vertical-align: top;
    .od-num-box {
      vertical-align: top;
      width: 22px;
      height: 30px;
      box-sizing: border-box;
      text-align: center;
      line-height: 24px;
      font-size: 16px;
      color: #666;
      display: inline-block;
      position: relative;
      background: url('../../assets/icon-od-step.png') no-repeat center;
      background-size: 100% 100%;
    }
    .od-step-top {
      padding-left: 20px;
    }
    .od-main-text {
      color: #666;
      font-size: 20px;
      line-height: 30px;
      padding: 0 20px 0 10px;
      display: inline-block;
      vertical-align: middle;
    }
    .od-line {
      display: inline-block;
      width: 140px;
      height: 2px;
      background-color: #666;
    }
    .od-step-bottom {
      font-size: 12px;
      margin-top: 12px;
    }
  }

  .od-step.is-current,
  .od-step.is-finish {
    .od-main-text {
      color: #6297F4;
    }
    .od-line {
      background-color: #6297F4;
    }
    .od-num-box {
      color: #6297F4;
      background: url('../../assets/icon-od-step-active.png') no-repeat center;
      background-size: 100% 100%;
    }
  }

  .od-step.is-current {
    .od-step-bottom {
      color: #6297F4;
    }
  }

  .od-step:last-child {
    .od-line {
      display: none;
    }
  }
</style>