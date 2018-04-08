<template>
  <div class="index" id="index">
    <div>
      <group>
        <cell title="title" value="value"></cell>
      </group>
    </div>
  </div>
</template>
<script>
  import { Group, Cell } from 'vux'
  export default {
    data() {
      return {
      }
    },
    mounted() {

    },
    components: {
      Group,
      Cell
    },
    computed: {
    }
  }

</script>

<style lang="scss" scoped>
  .index {}
</style>