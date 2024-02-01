<template>
  <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 layout-spacing">
    <div class="widget widget-account-invoice-three">
      <div class="widget-heading">
        <div class="wallet-balance">
          <p>{{ title }}</p>
          <h5 class="">{{ value }}<span class="w-currency">{{ currency }}</span></h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    props:{
        title: String,
        value: String,
        currency: String,
    }
});
</script>

<style>
</style>
