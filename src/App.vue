<template>
  <div id="app">
    <router-view></router-view>
    <toast></toast>
  </div>
</template>

<script>
  import toast from '@/components/Toast'
  export default {
    name: 'APP',
    mounted() {
      // this.$store.dispatch('LoginByUsername').then(() => {
      //   this.$router.push({ path: '/' })
      // }).catch(() => {
      // })
      // this.$alert('<span class="icon-error"></span>请正确填写信息！', '', {
      //   dangerouslyUseHTMLString: true
      // })
    },
    components: {
      toast
    }
  }

</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';
  @import './styles/style.less';
</style>