<template>
  <div class="container">
    <WorkCard v-for="product in products" :arg="product" :key="product.title" />
  </div>
</template>

<script>
import WorkCard from "~/components/WorkCard.vue";
import Data from "~/store/data.json";
export default {
  layout: "Works",
  components: {
    WorkCard
  },
  data: function() {
    return {
      Interval: []
    };
  },
  asyncData(context) {
    return {
      products: Data.products
    };
  },
  methods: {},
  mounted: function() {},
  computed: {},
  watch: {},
  filters: {}
};
</script>

<style>
</style>
