<template>
  <div class="card">
    <div class="box">
      <n-link :to="'/works/'+arg.caption" prefetch>
        <!--個々の背景に画像 -->
        <img :src="'worksimg/'+arg.caption+'.png'" />
        <div class="card_content">
          <p class="title">{{arg.title}}</p>
          <p class="desc">{{arg.desc}}</p>
        </div>
      </n-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    arg: {
      type: Object,
      required: true
    }
  },
  data() {
    return {};
  },
  mounted() {}
};
</script>
<style scoped>
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  position: absolute;
}

.card .box {
  width: 100%;
  height: 100%;
  position: relative;
}
.card {
  border: solid;
  border-color: black;
  width: 250px;
  height: 200px;
  margin: 10px;
}
.card_content {
  position: absolute;
  z-index: 1;
  width: 100%;

  bottom: 0;
  height: 80px;
}
.card_content .title {
  font-size: large;
  font-weight: bold;
}
</style>