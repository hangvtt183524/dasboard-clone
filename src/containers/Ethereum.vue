<template>
  <div>
    <div v-if="windowObject">
      <div v-for="key in Object.keys(windowObject)" :key="key">
        {{ key }}
      </div>
    </div>

    <div v-if="windowObject?.['ethereum']">
      <div v-for="key in Object.keys(windowObject['ethereum'])" :key="key">
        {{ key }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      windowObject: undefined
    }
  },
  mounted() {
    this.windowObject = window;
  }
}
</script>