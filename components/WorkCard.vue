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
  overflow: hidden;
}
.card {
  border-radius: 2px;
  overflow: hidden;
}
.card_content {
  position: absolute;
  z-index: 1;
  width: calc(100% - 5px);
  padding-left: 5px;
  height: 100%;
  top: 160px;
  transition-duration: 0.3s;
  background-color: rgba(255, 255, 255, 0.6);
}
.card_content .title {
  font-size: large;
  font-weight: 700;
  margin-top: 10px;

  margin-top: 5px;
  margin-bottom: 5px;
}
a .card_content .desc {
  transition-duration: 0.3s;
  opacity: 0;
  margin-top: 0;
  margin-bottom: 0;
}
.card .box:hover > a .card_content .desc {
  opacity: 1;
}
.card .box:hover > a .card_content {
  transform: translate(0px, -50px);
}

@media screen and (max-width: 450px) {
  .card_content .title {
    margin-top: 2px;
  }
  .card_content {
    padding-left: 3px;
    width: calc(100% - 3px);
    top: 155px;
  }
}
</style>