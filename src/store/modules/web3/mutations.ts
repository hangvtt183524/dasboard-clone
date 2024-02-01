import {State} from "@/store/modules/web3/state";
import {MutationTree} from "vuex";
import {
    SET_WEB3_ONBOARD,
    SET_PROVIDER,
    SET_IS_ENABLE,
    SET_HOLDER,
    SET_ID_TOKEN,
    SET_CONNECTED_WALLET,
    SET_SIGNATURE,
    SET_ADDRESS,
    SET_PROCESSING,
    CLEAN
} from "@/store/modules/web3/constant";

export const mutations: MutationTree<State> = {
    [SET_WEB3_ONBOARD](state, web3) {
        state.web3Onboard = web3;
    },
    [SET_PROVIDER](state, provider) {
        state.provider = provider;
    },
    [SET_IS_ENABLE](state, isEnable: boolean) {
        state.isEnable = isEnable;
    },
    [SET_HOLDER](state, holder: boolean) {
        state.holder = holder;
        localStorage.setItem("holder", String(holder));
    },
    [SET_ID_TOKEN](state, idToken: string) {
        state.idToken = idToken;
        localStorage.setItem("idToken", idToken);
    },
    [SET_CONNECTED_WALLET](state, wallet: object) {
        state.connectedWallet = wallet;
    },
    [SET_SIGNATURE](state, signature: string) {
        state.signature = signature;
        localStorage.setItem("signature", signature);
    },
    [SET_ADDRESS](state, address: string) {
        state.address = address;
        localStorage.setItem("address", address);
    },
    [SET_PROCESSING](state, processing: boolean) {
        state.processing = processing;
    },
    [CLEAN](state) {
        state.idToken = '';
        state.holder = false;
        state.isEnable = false;
        state.connectedWallet = {};
        state.signature = null;
        state.address = null;

        // localStorage.removeItem("idToken");
        // localStorage.clear();
    }
}
