<template>
  <div>
    <Header page="works" />
    <div class="container">
      <div></div>
      <div v-html="$md.render(markdown)"></div>
      <div style="padding:20px 0" />
      <div class="tagcontainer">
        <div v-for="tag in obj.tag" :key="tag">
          <a :href="'/?tag='+tag">{{tag}}</a>
        </div>
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
        type: Object
      }
    };
  },
  asyncData({ params }) {
    const id = params.id;
    return {
      markdown: require("~/assets/workstxt/" + id + ".md")["default"],
      products: Data.products,
      id: id
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
  head() {
    this.obj = this.products.find(item => item.caption === this.id);
    return {
      title: this.obj.title
    };
  }
};
</script>
<style lang="scss" scoped>
/*csss*/

/**タグ一覧 */
.tagcontainer {
  display: flex;
}
.tagcontainer div,
.tagcontainer a {
  margin: 5px;
  padding: 0.1em 0.5em;
  font-size: 16px;
  color: #fff;
  background: #333;
  // background: rgb(114, 114, 114);
  border-radius: 4px;
}
/**ここまで */

.container {
  padding-top: 30px;
  margin: auto;
  display: block;
  max-width: 600px;
  margin-bottom: 30px;
}
/deep/ p {
  font-size: 18px;
  line-height: 36px;
}
/deep/ h1 {
  font-size: 32px;
}
/deep/ .hatenablogcard {
  /**はてなブログ埋め込みの横幅調整 */
  padding: 0 20px;
}

/deep/ .twitter-tweet {
  /** Twitter埋め込みは真ん中に*/
  margin: auto;
  padding: 20px;
}
</style>
