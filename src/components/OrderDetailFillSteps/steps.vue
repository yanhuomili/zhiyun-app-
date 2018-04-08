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