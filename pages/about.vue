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
        <div class="about-description">
          <p>ハードウェアからWEBまで。ゆるふわものづくりをやってます</p>
          <p>
            様々なソフトウェアやハードウェア、時には最先端技術を使って創作を行い、<br />ユーモアセンスの溢れる面白いモノを作ります
          </p>
        </div>
        <div style="padding: 10px" />
        <div class="contact">
          <p class="mail">メール</p>
          <p class="adress Montserrat">{{ takex5g }}@gmail.com</p>
          <p class="twdm">
            （<a href="https://twitter.com/takex5g" target="_brank">Twitter</a
            >のDMもお使いください）
          </p>
        </div>
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
          <!-- <div class="icon Montserrat">
            <a href="https://note.com/takex5g" target="_brank">
              <img src="~/assets/img/note.png" alt="note" />
              <span>note</span>
            </a>
          </div> -->
        </div>
        <!-- <div>
          <h2>使用技術</h2>
          <p>Nuxt.js,</p>
        </div> -->
        <div class="award">
          <h2>受賞・出展など</h2>
          <table>
            <tbody>
              <tr v-for="(content, index) in award" :key="index">
                <th>{{ content.date }}</th>
                <td v-html="$md.render(content.detail)" />
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import award from "~/store/award.json";
export default {
  components: { Header },
  head() {
    return {
      title: "About",
    };
  },
  asyncData(context) {
    //jsonからデータを読みだし
    return {
      award: award.award, //生データ
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

<style lang="scss" scoped>
.about-description {
  max-width: 600px;
  margin: auto;
  line-height: 1.7;
}
.contact {
  .adress {
    margin-bottom: 8px;
  }
  .twdm {
    font-size: 0.8rem;
    margin: 0;
  }
}
.award {
  /*受賞歴等 */
  max-width: 700px;
  margin: auto;
  padding: 90px 0 30px 0;
  table {
    text-align: left;
    th {
      //見出し
      font-weight: bold;
      padding: 0 15px 0 0;
      font-family: "Montserrat";
      font-size: 0.9rem;
    }
    td {
      //文章
      line-height: 1.3rem;
      font-weight: normal;
      padding: 12px 0 12px 0;
      &::v-deep * {
        margin: 0;
      }
    }
  }
}

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
    margin-bottom: 3px;
    margin-top: 3px;
  }
}
</style>
