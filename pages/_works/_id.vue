<template>
  <div>
    <Header page="works" />
    <div class="container">
      <div></div>
      <div v-html="$md.render(markdown)"></div>
    </div>
  </div>
</template>

<script>
// import Data from "~/store/data.json";
import Header from "@/components/Header";
export default {
  layout: "Works",
  components: { Header },
  asyncData({ params }) {
    const id = params.id;
    return {
      markdown: require("~/assets/workstxt/" + id + ".md")["default"]
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
  }
};
</script>
<style lang="scss" scoped>
/*csss*/
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
