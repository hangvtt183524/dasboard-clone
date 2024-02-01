<template>
  <div>
    <div class="header-container fixed-top">
      <header class="header navbar navbar-expand-sm">
        <ul class="navbar-item theme-brand flex-row text-center">
          <router-link tag="li" to="/" class="nav-item theme-logo">
            <a>
              <img
                src="../assets/svg/logo-header.svg"
                class="navbar-logo"
                alt="logo"
              />
            </a>
          </router-link>
        </ul>
      </header>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({

});
</script>

<style>
</style>
