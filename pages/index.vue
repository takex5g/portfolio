<template>
  <div class="container">
    <div class="sortmenu">
      <ul>
        <li v-for="tag in tags" :key="tag">
          <input type="radio" :value="tag" :id="tag" v-model="picked" class="radio" />
          <label :for="tag">{{tag}}</label>
        </li>
      </ul>
    </div>
    <transition-group tag="div" class="works_container" name="card_sort_animations">
      <WorkCard v-for="product in pickedproducts" :arg="product" :key="product.title" />
    </transition-group>
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
      picked: "ALL"
    };
  },
  asyncData(context) {
    return {
      products: Data.products,
      tags: Data.tag
    };
  },
  methods: {},
  mounted: function() {},
  computed: {
    pickedproducts() {
      var newList = [];
      if (this.picked == "ALL") {
        return this.products;
      }
      for (var i = 0; i < this.products.length; i++) {
        if (this.products[i].tag.indexOf(this.picked) >= 0) {
          newList.push(this.products[i]);
        }
      }
      // 絞り込み後のリストを返す
      return newList;
    }
  },
  watch: {},
  filters: {}
};
</script>

<style >
.container {
  display: table;
}
.works_container {
  display: table-cell;
  margin-right: auto;
  margin-left: auto;
  padding-left: 15px;
  padding-right: 15px;

  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: flex-start;
}

/**横のメニュー */

.sortmenu {
  /**一番外殻 */
  display: table-cell;
  vertical-align: top;
}
ul {
  list-style-type: none;
}
li {
  padding: 20px 10px;
  font-size: 30px;
}
.radio {
  /**ラジオボタンの丸を消す */
  display: none;
}
input[type="radio"]:checked + label {
  /**チェックボックスラベル */
  font-weight: bold;
}
/**横メニュー 　ココマデ */

/**カードのソートアニメーション */
.card_sort_animations-leave-active {
  position: absolute;
}
.card_sort_animations-leave-active,
.card_sort_animations-enter-active {
  transition: opacity 1s, transform 0.5s ease;
}
.card_sort_animations-leave-to,
.card_sort_animations-enter {
  opacity: 0;
  /* transform: translateX(50px); */
}
.card_sort_animations-leave,
.card_sort_animations-enter-to {
  opacity: 1;
}
.card_sort_animations-move {
  transition: transform 0.5s;
}
</style>
