<template>
  <div>
    <Header page="about" />
    <div class="container">
      <div class="contents">
        <div class="yumoya">
          <img
            :class="{'yumoyaanime': anime}"
            src="~/assets/img/takex5g_transparent.png"
            width="100px"
            height="100px"
            alt="ゆうもや"
          />
        </div>
        <p class="name">ゆうもや</p>
        <p>ハードウェアからWEBまで。ゆるふわものづくりをやってます</p>
        <div style="padding:10px" />メールはこちら
        <p class="Montserrat">{{takex5g}}🐌monnichi.com</p>
        <div class="social">
          <div class="icon Montserrat">
            <a href="https://twitter.com/takex5g" target="_brank">
              <img src="~/assets/img/twitter.svg" width="20px" height="20px" alt="twitter" />
              <span>Twitter</span>
            </a>
          </div>
          <!--  <div class="icon">何</div>
          <div class="icon">何</div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
export default {
  components: { Header },
  head() {
    return {
      title: "About"
    };
  },
  data: function() {
    return {
      takex5g: "takex5g",
      anime: false
    };
  },
  methods: {
    doanime() {
      this.anime = true;
      var self = this;
      setTimeout(function() {
        self.anime = false;
      }, (Math.floor(Math.random() * 3) + 1) * 1000);
    },
    yumoanime() {
      var self = this;
      setTimeout(function() {
        self.doanime();
        self.yumoanime();
      }, (Math.floor(Math.random() * 10) + 5) * 1000);
    }
  },
  mounted() {
    this.yumoanime();
  }
};
</script>

<style scoped>
.yumoya {
  width: 100px;
  height: 100px;
  background: #b6d55d;
  border-radius: 50%;
  margin: auto;
  overflow: hidden;
  transition: 0.8s;
  position: relative;
  z-index: 1;
}
.yumoya img {
  left: 0px;
  transition: 0.8s;
  top: 0px;
  position: absolute;
}
.yumoyaanime {
  transform: translate(0px, 40px);
}
.container {
  margin-top: 10%;
  margin: auto;
  margin-top: 60px;
}
.contents {
  width: 80%;
  height: 50%;
  text-align: center;
  margin: 0 auto;
}
.name {
  font-weight: 700;
}
.social {
  display: flex;
  justify-content: space-around;
  margin-top: 50px;
  transition: 0.3s;
}
.social:hover {
  opacity: 0.8;
}

.social .icon * {
  vertical-align: middle;
}
</style>
