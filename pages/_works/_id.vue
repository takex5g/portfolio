<template>
  <div>
    <div class="container"></div>
    <div v-html="$md.render(markdown)"></div>
  </div>
</template>

<script>
// import Data from "~/store/data.json";
export default {
  layout: "WorksSingle",
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
<style scoped>
/** Twitter埋め込みは真ん中に*/
.twitter-tweet {
  margin: auto;
}
p {
  color: red;
}
</style>
