<template>
  <nav>
    <n-link to="/" prefetch>
      <div>Works</div>
    </n-link>
    <n-link to="/about" prefetch>
      <div>About</div>
    </n-link>
    <a href="https://mononichi.com/">
      <div>BLOG</div>
    </a>
  </nav>
</template>

<script>
export default {
  /*props: {
    value: {
      type: Number,
      required: true
    }
  },*/
  /* data() {
    return {
      animated_number: 0
    };
  },
  mounted() {}*/
};
</script>
<style scoped>
nav {
  display: flex;
  justify-content: flex-end;
}
nav a {
  padding: 10px;
  padding-right: 20px;
}
</style>