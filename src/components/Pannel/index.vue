<template>
  <div id="ht-pannel">
    <div class="ht-title">
      <slot name="title"></slot>
    </div>
    <div class="ht-content">
      <slot name="content">
      </slot>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    mounted() {
    },
    computed: {
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
  #ht-pannel {
    border: 1px solid #ddd;
    .ht-title {
      font-size: 24px;
      line-height: 48px;
      padding-left: 30px;
      background-color: #f1f1f1;
      border-bottom: 1px solid #ddd;
    }
  }
</style>