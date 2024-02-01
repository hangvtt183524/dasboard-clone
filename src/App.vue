<template>
  <div>
    <Notification></Notification>
    <router-view></router-view>

    <show-info v-if="getProcessing" :closable="false" :show-background="true">
      <template v-slot:title>
        <div class="loading-title">Connecting Wallet...</div>
      </template>

      <template v-slot:content>
        <div class="loading loading-connect"></div>
      </template>
    </show-info>
  </div>
</template>

<script lang="ts">
import Notification from "@/components/Notification.vue";
import ShowInfo from "@/modal/ShowInfo.vue";
import {mapActions, mapGetters} from "vuex";
import {MOUDLE_WEB3_NAME, INIT_WALLET} from "@/store/modules/web3/constant";

export default {
  name: 'App',
  components: {
    ShowInfo,
    Notification,
  },
  computed: {
    ...mapGetters(MOUDLE_WEB3_NAME, ['getProcessing']),
  },
  methods: {
    ...mapActions(MOUDLE_WEB3_NAME, [INIT_WALLET])
  },
  created() {
  },
  async mounted() {
    await this.initWallet();
  }
}
</script>

<style lang="scss">
@import "./assets/scss/styles.scss";
</style>

<style>
.loading {
  display: block;
  position: absolute;
  z-index: 1000;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: transparent url('./assets/img/loading.gif') 50% 50% no-repeat;
}

.loading-connect {
  background-size: 70%;
}

.loading-title {
  font-size: 24px;
  font-weight: 600;
}
</style>
