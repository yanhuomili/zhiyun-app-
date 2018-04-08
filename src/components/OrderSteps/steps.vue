<template>
  <div>
    <slot text="hello from child"></slot>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        steps: []
      }
    },
    mounted() {
    },
    computed: {
      status() {
        return this.value
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