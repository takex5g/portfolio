<template>
  <div>
    <Header page="about" />
    <div class="container">
      <div class="contents">
        <img src="~/assets/img/takex5g.png" width="100px" height="100px" alt="ゆうもや" />
        <p>ゆうもや</p>
        <p>ハードウェアからWEBまで。ゆるふわものづくりをやってます</p>
        <div style="padding:10px" />メールはこちら
        <p class="Montserrat">{{takex5g}}🐌monnichi.com</p>
        <div class="social">
          <div class="icon Montserrat">
            <a href="https://twitter.com/takex5g" target="_brank">
              <img src="~/assets/img/twitter.svg" width="20px" height="20px" alt="twitter" />
              <span>Twitter</span>
            </a>
          </div>
          <!--  <div class="icon">何</div>
          <div class="icon">何</div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
export default {
  components: { Header },
  data: function() {
    return {
      takex5g: "takex5g"
    };
  }
};
</script>

<style scoped>
.container {
  margin-top: 10%;
  margin: auto;
  margin-top: 60px;
}
.contents {
  width: 80%;
  height: 50%;
  text-align: center;
  margin: 0 auto;
}
.social {
  display: flex;
  justify-content: space-around;
  margin-top: 50px;
}
.social .icon * {
  vertical-align: middle;
}
</style>
