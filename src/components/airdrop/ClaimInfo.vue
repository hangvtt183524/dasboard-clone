<template>
  <div class="confirm-claim-content">
    <p>Amount <img src="../../assets/svg/success.svg" alt="" width="24"></p>
    <div class="item">
      <p>Claimed:</p>
      <p>{{ formatNumber(data.claim) || '-' }}
        RBIF</p>
    </div>
    <div class="item">
      <p>Burned:</p>
      <p>{{ formatNumber(data.burn) || '-' }}
        RBIF</p>
    </div>
    <div class="item">
      <p class="m-0">Contributed:</p>
      <p class="m-0">{{ formatNumber(data.contribute) || '-' }}
        RBIF</p>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    data: {
      type: Object,
    }
  },
  mounted() {
  },
  methods: {
    formatNumber(number: number) {
      if (number == undefined) {
        return "-"
      }
      let rs = number + '.';
      return rs.replace(/(\d)(?=(\d{3})+\.)/g, '$1,').slice(0, -1);
    },
  }
}
</script>
