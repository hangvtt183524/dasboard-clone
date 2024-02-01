<template>
  <div>
    <div class="mars"></div>
    <img src="../../assets/img/404.svg" class="logo-404" />
    <p class="title-err">Access Forbidden</p>
    <p class="subtitle">
      You tried to access a page <br />
      you did not have prior authorization for.
    </p>
    <div align="center">
      <router-link to="/" class="btn-back403">Back to previous page</router-link>
    </div>
    <img src="../../assets/img/astronaut403.svg" class="astronaut" />
    <img src="../../assets/img/spaceship.svg" class="spaceship" />
  </div>
</template>

<script lang="ts">
export default {
  title: "403 FORBIDEN - ROBO INU FINANCE",
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
