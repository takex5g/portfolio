<template>
  <div>
    <Header page="works" />
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
  </div>
</template>

<script>
import WorkCard from "~/components/WorkCard.vue";
import Data from "~/store/data.json";
import Header from "@/components/Header";
export default {
  layout: "Works",
  components: {
    WorkCard,
    Header
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
  mounted: function() {
    if (this.$route.query.tag != null) {
      for (var i = 0; i < this.tags.length; i++) {
        if (this.tags[i] == this.$route.query.tag) {
          this.picked = this.$route.query.tag;
          return;
        }
      }
    }
  },
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

<style scoped>
.container {
  display: grid;
  grid-template-columns: auto 1fr;
}
.works_container {
  margin-right: auto;
  margin-left: auto;
  width: 100%;
  display: grid;
  gap: 15px;
  /* grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); */
  /* grid-template-columns: repeat(4, 1fr); */
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  grid-auto-rows: minmax(200px, 200px);
}
@media screen and (max-width: 1080px) {
  .works_container {
  }
}

/**横のメニュー */

.sortmenu {
  /**一番外殻 */
  padding-right: 15px;
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
@media screen and (max-width: 807px) {
  /*　画面サイズが480pxまではここを読み込む　*/

  li {
    padding: 20px 10px;
    font-size: 20px;
  }
  ul {
    padding-left: 10px;
  }
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
@media screen and (max-width: 400px) {
  /*　スマホ対応　*/
  .works_container {
    justify-content: center;
    padding: 0; /**とにかく詰める。外殻の余白なくす */
  }
  .card {
    /**カードについてはカードコンポーネント */
  }
}
</style>
