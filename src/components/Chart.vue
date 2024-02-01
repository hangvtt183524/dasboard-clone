<template>
  <canvas id="planet-chart" ref="canvas" width="200" height="80"></canvas>
</template>

<script lang="js">
import Chart from 'chart.js';

export default {
  name: 'PlanetChart',
  props: {
    ChartData: {
      type: Object,
      required: true
    }
  },
  data(){
    return{
      dataFromAPI: [8, 5, 7, 4, 6, 1.1, 3],
      data: this.ChartData,
    }
  },
  mounted() {
    const ctx = document.getElementById('planet-chart');
    this.data.data.datasets[0].data = this.dataFromAPI;
    new Chart(ctx, this.data);
  },
  methods:{
  }
}
</script>
