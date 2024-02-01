<template>
  <div>
    <div class="sub-header-container">
      <header class="header navbar navbar-expand-sm">
        <a
            href="javascript:void(0);"
            class="sidebarCollapse"
            data-placement="bottom"
            @click="showSideBar"
        >
          <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-menu"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </a>
        <ul class="navbar-nav flex-row">
          <li>
            <div class="page-header">
              <nav class="breadcrumb-one" aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <router-link to="/">Dashboard</router-link>
                  </li>
                  <li
                      class="breadcrumb-item"
                      v-for="(item, index) in items"
                      :key="index"
                  >
                    <router-link
                        :to="index !== items.length - 1 ? item.path : '#'"
                    >{{ item.name }}
                    </router-link>
                  </li>
                </ol>
              </nav>
            </div>
          </li>
        </ul>
        <div class="btn-connectwallet">

          <button @click="onClickConnect" class="btn button-custom bg-btn" v-if="GetWalletAddress === 'Connect Wallet'">
            {{ GetWalletAddress }}
          </button>

          <button @click="onClickDisconnect" class="btn button-custom bg-btn" v-else>
            {{ GetWalletAddress }}
          </button>
          <a href="https://roboglobal.info/" target="_blank">
            <button class="btn button-custom btn-bg-trans d-none d-md-block">
              Back to Home
            </button>
          </a>
        </div>
      </header>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {CONNECT_ACTION, LOGOUT_ACTION, MOUDLE_WEB3_NAME} from "@/store/modules/web3/constant";
import {mapActions, mapGetters} from "vuex";

export default Vue.extend({
  data() {
    return {
      token: null,
      items: [],
    };
  },
  components: {},
  watch: {
    $route() {
      this.getRoute();
    },
    getAddress() {
      if (this.$route.path !== "/") {
        this.$router.push({path: "/"});
      }
    }
  },
  computed: {
    ...mapGetters(MOUDLE_WEB3_NAME, ['IsLogin', 'getAddress']),
    GetWalletAddress() {
      const connectedAddress = this.getAddress;

      return connectedAddress
          ? connectedAddress.slice(0, 10) +
          (10 < connectedAddress.length ? "..." : "")
          : "Connect Wallet";
    },
  },

  methods: {
    ...mapActions(MOUDLE_WEB3_NAME, [
      CONNECT_ACTION,
      LOGOUT_ACTION,
    ]),
    showSideBar() {
      this.$eventBus.$emit("showSideBar");
    },
    getRoute() {
      this.items = [];
      this.$route.matched.forEach((e: any) => {
        if (e.name === "DAO vote") {
          e.name = "vote"
        }
        return this.items.push({
          name: e.name,
          path: e.path,
        });
      });
    },

    onClickConnect(e: any) {
      e.preventDefault();
      return this.connect();
    },
    onClickDisconnect(e: any) {
      e.preventDefault();
      return this.logout();
    }
  },

  async created() {
    this.getRoute();
  },
});
</script>

<style>
.btn-connectwallet {
  display: flex;
  flex: 1;
  justify-content: flex-end;
}

.btn-connectwallet button {
  margin-right: 5px;
}

@media only screen and (min-width: 768px) {
  .btn-connectwallet button {
    margin-right: 30px;
  }
}
</style>
