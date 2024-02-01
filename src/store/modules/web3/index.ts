import {getters} from './getters'
import {actions} from './actions'
import {mutations} from './mutations'
import { web3Onboard } from "@/web3";

export default {
    namespaced: true,
    state: {
        web3Onboard: web3Onboard,
        isEnable: false,
        holder: localStorage.getItem("holder"),
        idToken: localStorage.getItem("idToken"),
        connectedWallet: null,
        signature: localStorage.getItem("signature"),
        processing: false,
        address: localStorage.getItem("address")
    },
    getters,
    actions,
    mutations,
};
