<template>
  <nav class="Montserrat">
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
  display: flex;
  justify-content: flex-end;

  margin-bottom: 25px;
  margin-top: 10px;
}
nav a {
  padding: 10px;
  padding-right: 20px;

  transition: 0.3s;
  position: relative;
  display: inline-block;
  text-decoration: none;
}
.bold {
  font-weight: 700;
}

nav a:hover {
  /* color: #00b5ad;  */
}
nav a::after {
  position: absolute;
  bottom: -4px;
  left: 0;
  content: "";
  width: 100%;
  height: 2px;
  background: black;
  transform: scale(0, 1);
  transform-origin: right top;
  transition: transform 0.3s;
}

nav a:hover::after {
  transform-origin: left top;
  transform: scale(1, 1);
}
</style>