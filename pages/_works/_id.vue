<template>
  <div>
    <div class="container">ゆうもやだよ ID is {{ $route.params.id }}</div>
    <div v-html="$md.render('html化したいマークダウンのテキスト')"></div>
  </div>
</template>

<script>
export default {
  layout: "WorksSingle"
};
</script>

<style >
</style>
