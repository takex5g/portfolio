<template>
  <div>
    <Header page="about" v-on:click-event="$router.push('/')" />
    <div class="container">
      <div class="contents">
        <div class="yumoya">
          <img
            :style="yumoyaanime"
            src="~/assets/img/takex5g_transparent.png"
            width="100px"
            height="100px"
            alt="ゆうもや"
          />
        </div>
        <p class="name">ゆうもや</p>
        <p>ハードウェアからWEBまで。ゆるふわものづくりをやってます</p>
        <p></p>
        <div style="padding: 10px" />
        メール
        <p class="Montserrat">{{ takex5g }}🐌mononichi.com</p>
        <div class="social">
          <div class="icon Montserrat">
            <a href="https://twitter.com/takex5g" target="_brank">
              <img src="~/assets/img/twitter.svg" alt="twitter" />
              <span>Twitter</span>
            </a>
          </div>
          <!-- <div class="icon Montserrat">
            <a href="https://www.tiktok.com/@takex5g" target="_brank">
              <img
                src="~/assets/img/tiktok.svg"
                
                alt="tiktok"
              />
              <span>TikTok</span>
            </a>
          </div> -->
          <div class="icon Montserrat">
            <a href="https://github.com/takex5g" target="_brank">
              <img src="~/assets/img/github.svg" alt="github" />
              <span>GitHub</span>
            </a>
          </div>
          <div class="icon Montserrat">
            <a href="https://note.com/takex5g" target="_brank">
              <img src="~/assets/img/note.png" alt="note" />
              <span>note</span>
            </a>
          </div>
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
      title: "About",
    };
  },
  data: function () {
    return {
      takex5g: "takex5g",
      anime: 0,
    };
  },
  methods: {
    doanime() {
      var self = this;
      this.anime = Math.floor(Math.random() * 3);
      setTimeout(() => {
        self.anime = Math.floor(Math.random() * 3);
      }, 1 * 1000);
      setTimeout(() => {
        self.anime = Math.floor(Math.random() * 2);
      }, 1 * 2000);
    },
    yumoanime() {
      var self = this;
      setTimeout(() => {
        self.doanime();
        self.yumoanime();
      }, (Math.floor(Math.random() * 10) + 5) * 1000);
    },
  },
  mounted() {
    this.yumoanime();
  },
  computed: {
    yumoyaanime: function () {
      var pos = 0;
      if (this.anime == 0) pos = 0;
      else if (this.anime == 1) pos = 40;
      else if (this.anime == 2) pos = 85;
      return {
        transform: "translate(0px, " + pos + "px)",
      };
    },
  },
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

.container {
  margin: auto;
  margin-top: 60px;
  padding: 0 20px 0 20px;
}
.contents {
  width: 100%;
  text-align: center;
  margin: 0 auto;
}
.name {
  font-weight: 700;
}
.social {
  display: flex;
  justify-content: center;
  margin-top: 50px;
  transition: 0.3s;

  a {
    text-decoration: none;
  }
}
.social:hover {
  opacity: 0.8;
}

.social .icon * {
  vertical-align: middle;
}
.icon {
  margin: 20px;
  img {
    width: 22px;
    height: 22px;
  }
}
</style>
