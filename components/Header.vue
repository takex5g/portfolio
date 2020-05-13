<template>
  <nav>
    <n-link to="/" prefetch>
      <div :class="{bold : page=='works'}">Works</div>
    </n-link>
    <n-link to="/about" prefetch>
      <div :class="{bold : page=='about'}">About</div>
    </n-link>
    <a href="https://mononichi.com/">
      <div>BLOG</div>
    </a>
  </nav>
</template>

<script>
export default {
  props: {
    page: {
      type: String
    }
  }
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
  font-family: "Montserrat";
  display: flex;
  justify-content: flex-end;

  margin-bottom: 15px;
  margin-top: 10px;
}
nav a {
  padding: 10px;
  padding-right: 20px;
}
.bold {
  font-weight: bold;
}
</style>