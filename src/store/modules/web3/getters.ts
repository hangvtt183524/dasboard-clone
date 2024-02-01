import {GetterTree} from 'vuex'
import {RootState} from "@/store/modules/RootState";
import {State} from "@/store/modules/web3/state";

export const getters: GetterTree<State, RootState> = {
    getProvider: state => state.provider,
    IsLogin: state => state.isEnable,
    IsWalletHolder: state => state.holder,
    getIdToken: state => state.idToken,
    getConnectedWallet: state => state.connectedWallet,
    getSignature: state => state.signature,
    getProcessing: state => state.processing,
    getAddress: state => state.address ? state.address : ""
}
