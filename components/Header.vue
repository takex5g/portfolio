<template>
  <nav class="Montserrat">
    <img src="~/assets/img/monologo.png" width="50px" height="50px" alt="まいにちものづくり" />
    <n-link to="/" prefetch>
      <div :class="{bold : page=='works'}">Works</div>
    </n-link>
    <n-link to="/about" prefetch>
      <div :class="{bold : page=='about'}">About</div>
    </n-link>
    <a href="https://mononichi.com/blog">
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

  margin-bottom: 29px;
  margin-top: 13px;
  font-size: 24px;
  border-bottom: 2px solid black;
}
nav a {
  padding: 13px 20px;

  transition: 0.3s;
  position: relative;
  display: inline-block;
  text-decoration: none;
}
nav img {
  margin-right: auto;
  margin-bottom: 5px;
  margin-left: 3px;
}

@media screen and (max-width: 450px) {
  nav {
    font-size: 19px;
    margin-bottom: 15px;
  }
  nav img {
    width: 40px;
    height: 40px;
  }
}
@media screen and (max-width: 365px) {
  nav a {
    padding: 13px 13px;
  }
}

.bold {
  font-weight: 700;
}

nav a:hover {
  background: hsla(0, 0%, 0%, 0.075);
}
/* nav a::after {
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
} */
</style>