<template>
  <div>
    <div class="mars"></div>
    <img src="../../assets/img/500.svg" class="logo-404" />
    <p class="title-err">Internal Server Error</p>
    <p class="subtitle">
      Sorry, something went wrong. <br />
      Please contact email
      <a href="mailto:support@roboinu.io">support@roboinu.io</a><br />or
      Telegram Channel
    </p>
    <div align="center">
      <a class="btn-back500" href="https://t.me/robo_inu">t.me/robo_inu</a>
    </div>
    <img src="../../assets/img/astronaut500.svg" class="astronaut" />
    <img src="../../assets/img/spaceship.svg" class="spaceship" />
  </div>
</template>

<script lang="ts">
export default {
  title: "500 Internal Server Error - ROBO INU FINANCE",
  mounted() {
    document.body.classList.add("body-error-page");
  },
  destroyed() {
    document.body.classList.remove("body-error-page");
  },
};
</script>

<style scoped>
@import "../../assets/css/errorpage/errorpage.css";
</style>
