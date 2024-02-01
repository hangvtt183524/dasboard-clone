import Vue from 'vue'
import Vuex from 'vuex'
import Web3ModuleStore from "@/store/modules/web3";

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        Web3ModuleStore,
    }
});
