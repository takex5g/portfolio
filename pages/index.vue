<template>
  <div>
    <Header page="works" v-on:click-event="shuffle" />

    <div class="container">
      <div class="sortmenu Montserrat">
        <ul>
          <li v-for="tag in tags" :key="tag">
            <input
              type="radio"
              :value="tag"
              :id="tag"
              v-model="picked"
              class="radio"
              @click="taginfo=false"
            />
            <label :for="tag">{{tag}}</label>
          </li>
        </ul>
      </div>
      <div>
        <div class="taginfo" v-if="taginfo">
          タグ絞り込み:
          <span class="Montserrat">{{picked}}</span>
        </div>
        <transition-group tag="div" class="works_container" name="card_sort_animations">
          <WorkCard v-for="product in pickedproducts" :arg="product" :key="product.title" />
        </transition-group>
      </div>
    </div>

    <transition name="fade">
      <div class="displayMode" v-show="show_dispMode">
        <div>
          <p>{{displayMode_txt}}</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import WorkCard from "~/components/WorkCard.vue";
import Data from "~/store/data.json";
import Header from "@/components/Header";
export default {
  components: {
    WorkCard,
    Header
  },
  head() {
    return {
      title: "ゆうもや"
    };
  },
  data: function() {
    return {
      picked: "ALL", //チェックしているタグ
      displayMode: 0, //0:初期,1:製作日順,2:シャッフル
      show_dispMode: false, //状態遷移表示
      taginfo: false
    };
  },
  asyncData(context) {
    //jsonからデータを読みだし
    return {
      raw_products: Data.products, //生データ
      tags: Data.tag //左に表示されるタグ一覧
    };
  },
  methods: {
    //シャッフルをする関数
    shuffle() {
      this.show_dispMode = true; //遷移表示
      let self = this;
      setTimeout(function() {
        self.show_dispMode = false; //nミリ秒後遷移非表示
      }, 800);
      if (this.displayMode == 2) {
        //0→1→2→0・・
        this.displayMode = 0;
        return;
      }
      this.displayMode++;
    }
  },
  mounted: function() {
    //パラメーターのtagがタグリストにあればtaginfoを非表示
    let count_picked = false; //pickedに存在するか確かめる変数
    //パラメーターがあるか
    if (this.$route.query.tag != null) {
      //パラメーターのtagが(左メニューに表示される)タグリストにあるか
      for (var i = 0; i < this.tags.length; i++) {
        if (this.tags[i] == this.$route.query.tag) {
          //もしあればpickedをtrue
          count_picked = true;
          return 0;
        }
        //pickedにセットする
        this.picked = this.$route.query.tag;
      }
      //タグリストに無かったら実行
      if (count_picked == false) this.taginfo = true;
      else this.taginfo = false;
    }
  },
  computed: {
    pickedproducts() {
      //チェック状態のプロダクトの配列を返す
      var newList = [];
      //ALLだったら全て返す
      if (this.picked == "ALL") {
        return this.products;
      }
      //タグと一致したプロダクトをnewListにプッシュする
      for (let i = 0; i < this.products.length; i++) {
        if (this.products[i].tag.indexOf(this.picked) >= 0) {
          newList.push(this.products[i]);
        }
      }
      // 絞り込み後のリストを返す
      return newList;
    },
    products() {
      //ソートしたプロダクトデータを返す
      if (this.displayMode == 0) {
        //ノーマル
        return this.raw_products;
      } else if (this.displayMode == 1) {
        //日付順
        var sortarr = this.raw_products.slice();
        const sortfunc = function compare(a, b) {
          let comparison = 0;
          if (a.date > b.date) {
            comparison = -1;
          } else if (a.date < b.date) {
            comparison = 1;
          }
          return comparison;
        };
        sortarr.sort(sortfunc);
        return sortarr;
      } else if (this.displayMode == 2) {
        //シャッフル
        const shuffle = ([...array]) => {
          for (let i = array.length - 1; i >= 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
          }
          return array;
        };
        return shuffle(this.raw_products);
      }
    },
    displayMode_txt() {
      if (this.displayMode == 0) {
        return "ノーマル";
      } else if (this.displayMode == 1) {
        return "製作日順";
      } else if (this.displayMode == 2) {
        return "シャッフル";
      }
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
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-auto-rows: 200px;
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
li label {
  cursor: pointer;
}
.radio {
  /**ラジオボタンの丸を消す */
  display: none;
}
input[type="radio"]:checked + label {
  /**チェックボックスラベル */
  font-weight: 700;
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
/**タグ絞り込み表示 */
.taginfo {
  font-size: 24px;
  padding: 15px 0;
}
.taginfo span {
  font-weight: bold;
}
/**絞り込みココマデ */
/**ディスプレイモード(モーダル画面) */
.displayMode {
  width: 300px;
  height: 100px;
  text-align: center;
  font-size: 50px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  font-weight: bold;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  z-index: 3;
}
.displayMode div {
  position: relative;
  width: 100%;
  height: 100%;
}
.displayMode div p {
  width: 100%;
  height: 60px;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  text-align: center;
  position: absolute;
  margin: auto;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
/**ディスプレイモード ココマデ */

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
@media screen and (max-width: 450px) {
  /*　スマホ対応　*/
  .container {
    /**カラムの組み方を変更 */
    grid-template-columns: auto;
    grid-template-rows: auto 1fr;
  }
  ul {
    /**ソートメニューを横並びに */
    display: flex;
    justify-content: space-around;
    margin-bottom: 15px;
  }
  ul li {
    /**余白を消してフォントサイズを小さく */
    padding: 0;
    font-size: small;
  }

  .works_container {
    /*真ん中にして　グリッドの大きさ組み換え*/
    margin-right: auto;
    margin-left: auto;
    width: 100%;
    display: grid;
    gap: 15px;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    grid-auto-rows: 200px;
  }

  .taginfo {
    /* 文字小さく */
    font-size: 19px;
  }
}
</style>
