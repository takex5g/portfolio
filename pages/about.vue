<template>
  <div>
    <Header page="about" />
    <div class="container" :style="styleObject">
      <div class="contents">
        <img src="~/assets/img/takex5g.png" width="100px" height="100px" alt="ゆうもや" />
        <p>ゆうもや</p>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
export default {
  layout: "Works",
  components: { Header },
  data: function() {
    return {
      styleObject: {
        width: 0,
        height: 0
      }
    };
  },
  methods: {
    handleResize: function() {
      // resizeのたびにこいつが発火するので、ここでやりたいことをやる
      if (process.browser) {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
      }
    }
  },
  mounted: function() {
    //window.addEventListener("resize", this.handleResize);
    if (process.browser) {
      this.styleObject.width = window.innerWidth + "px";
      this.styleObject.height = window.innerHeight + "px";
      // ここに window とか document を使った処理
    }
  }
  /* beforeDestroy: function() {
    window.removeEventListener("resize", this.handleResize);
  }*/
};
</script>

<style scoped>
.container {
}
.contents {
  width: 300px;
  height: 50%;
  text-align: center;
  margin: auto;
}
</style>
