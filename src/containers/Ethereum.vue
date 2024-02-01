<template>
  <div>
    <div v-if="window">
      <div v-for="key in Object.keys(window)" :key="key">
        {{ key }}
      </div>
    </div>

    <div v-if="window?.['ethereum']">
      <div v-for="key in Object.keys(window['ethereum'])" :key="key">
        {{ key }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {

}
</script>