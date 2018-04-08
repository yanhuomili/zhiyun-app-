<template>
  <div class="entry" id="entry">
    <router-link to="/queryFareSea">查海运费</router-link>
    <router-link to="/queryFareTrailer">查拖车费</router-link>
    <router-link to="/queryFareCustoms">查报关费</router-link>
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
    methods: {

    },
    components: {
    },
    computed: {
    }
  }

</script>

<style lang="less" scoped>
  @import "./../../styles/var.less";
  .entry {}
</style>