<template>
  <div>{{arg}}</div>
</template>

<script>
export default {
  props: {
    arg: {
      type: Object,
      required: true
    }
  },
  data() {
    return {};
  },
  mounted() {}
};
</script>
<style scoped>
</style>