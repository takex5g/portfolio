<template>
  <div>
    <Header page="works" v-on:click-event="$router.push('/')" />
    <div class="container">
      <div></div>
      <h1 class="title">{{ obj.title }}</h1>
      <h2 class="desc">{{ obj.desc }}</h2>
      <img src="~/assets/img/clock.svg" width="13px" height="13px" />
      <p class="date">{{ date[0] }}/{{ date[1] }}/{{ date[2] }}</p>
      <div class="md" v-html="$md.render(markdown)"></div>
      <div style="padding: 20px 0" />
      <div class="tagcontainer">
        <n-link to="/" prefetch class="back">
          <div class="circle" />
          <p>戻る</p>
        </n-link>
        <n-link
          :to="'/?tag=' + tag"
          prefetch
          v-for="tag in obj.tag"
          :key="tag"
          class="tag"
        >
          <div>{{ tag }}</div>
        </n-link>
      </div>
    </div>
  </div>
</template>

<script>
import Data from "~/store/data.json";
import Header from "@/components/Header";
export default {
  components: { Header },
  data() {
    return {
      //今表示している作品の情報が格納される
      obj: {
        type: Object,
      },
    };
  },
  asyncData({ params }) {
    const id = params.id;
    return {
      markdown: require("~/assets/workstxt/" + id + ".md")["default"],
      products: Data.products,
      id: id,
    };
  },
  mounted() {
    /**twitterウィジットの埋め込み */
    let recaptchaScript = document.createElement("script");
    recaptchaScript.setAttribute(
      "src",
      "https://platform.twitter.com/widgets.js"
    );
    document.head.appendChild(recaptchaScript);
  },
  computed: {
    date() {
      var date = String(this.obj.date);
      return [date.substring(0, 4), date.substring(4, 6), date.substring(6, 8)];
    },
  },
  head() {
    this.obj = this.products.find((item) => item.caption === this.id);
    return {
      title: this.obj.title,
    };
  },
};
</script>
<style lang="scss" scoped>
/*csss*/
/**タイトル,日付,説明*/
.desc {
  font-weight: normal;
  font-size: 1.1em;
}
.date {
  display: inline;
  font-weight: normal;
  font-size: 15px;
  margin: 0;
  color: #a8abb1;
}
/**ここまで */
/**タグ一覧 */
.tagcontainer {
  font-family: "Montserrat";
  display: flex;
  align-items: center;
  a {
    text-decoration: none;
  }
}
.tagcontainer .tag {
  margin: 5px;
  padding: 0.1em 0.5em;
  font-size: 16px;
  color: black;
  border: 1px solid black;
  border-radius: 4px;
}
.tagcontainer > * {
  transition: 0.3s;
}
.tagcontainer .tag:hover {
  color: white;
  background: black;
}
.tagcontainer .back {
  position: relative;
}
.tagcontainer .back .circle {
  transition: 0.3s;
  margin-right: 15px;
}
.tagcontainer .back p {
  margin: 0;
  padding: 0;
  margin-left: 4px;
  position: absolute;
  top: 18px;
  font-size: 10px;
}

@media screen and (max-width: 450px) {
  .tagcontainer .back {
    margin-left: 10px;
  }
}

.tagcontainer .back:hover > .circle {
  background: black;
}
.tagcontainer .back:hover > .circle::before,
.tagcontainer .back:hover > .circle::after {
  background: white;
}
/**ここまで */
/**CSSだけで作る自作戻るボタン */
.circle {
  width: 25px;
  height: 25px;
  border: 2px solid black;
  border-radius: 50%; /*角丸*/
}
.circle::before {
  transition: 0.3s;
  position: absolute;
  content: "";
  width: 3px;
  height: 10px;
  background: black;
  transform: translateX(10px) translateY(5px) rotate(45deg);
}
.circle::after {
  transition: 0.3s;
  position: absolute;
  content: "";
  width: 3px;
  height: 10px;
  background: black;
  transform: translateX(10px) translateY(10px) rotate(-45deg);
}
/**戻るボタンココマデ */

.container {
  padding-top: 30px;
  margin: auto;
  display: block;
  max-width: 600px;
  margin-bottom: 30px;
}

::v-deep video {
  width: 100%;
}
::v-deep a {
  text-decoration: underline;
}
::v-deep p {
  font-size: 18px;
  line-height: 36px;
}
::v-deep h1 {
  font-size: 32px;
}
::v-deep .hatenablogcard {
  /**はてなブログ埋め込みの横幅調整 */
  padding: 20px 0;
}

::v-deep .twitter-tweet {
  /** Twitter埋め込みは真ん中に*/
  margin: auto;

  padding: 20px 0;
}

::v-deep .md .link {
  transition: 0.3s;
}
::v-deep .md .link:hover {
  opacity: 0.8;
}
</style>
