<template>
  <div>
    <Header page="about" />
    <div class="container" :style="styleObject">
      <div class="contents">
        <img src="~/assets/img/takex5g.png" width="100px" height="100px" alt="ゆうもや" />
        <p>ゆうもや</p>
        <p>ハードウェアからWEBまで。ゆるふわものづくりをやってます</p>
        <p>takex5g🐌monnichi.com</p>
        <div class="social">
          <div class="icon">Tw</div>
          <div class="icon">何</div>
          <div class="icon">何</div>
        </div>ここに置くのTwitterしかいらねぇじゃん
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
export default {
  components: { Header },
  data: function() {
    return {
      styleObject: {
        width: 500
        //height: 500
      }
    };
  },
  methods: {
    handleResize: function() {
      // resizeのたびにこいつが発火するので、ここでやりたいことをやる
      if (process.browser) {
        this.width = window.innerWidth;
        // this.height = window.innerHeight;
      }
    }
  },
  mounted: function() {
    //window.addEventListener("resize", this.handleResize);
    if (process.browser) {
      this.styleObject.width = window.innerWidth - 10 + "px";
      // this.styleObject.height = window.innerHeight + "px";
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
  margin-top: 10%;
}
.contents {
  width: 80%;
  height: 50%;
  text-align: center;
  margin: 0 auto;
}
.social {
  display: flex;
  justify-content: space-around;
  margin-top: 50px;
}
.social .icon {
  width: 30px;
  height: 30px;
  background: skyblue;
}
</style>
