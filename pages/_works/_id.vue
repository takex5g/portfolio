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
  }
};
</script>

<style >
</style>
