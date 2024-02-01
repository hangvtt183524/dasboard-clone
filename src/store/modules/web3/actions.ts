import {getNonce, performLogin, register} from "@/api/connect/connect";
import {signMessage} from "@/web3/sign";
import {checkHolderToken} from "@/api/holder/holder";
import {ActionTree} from "vuex";
import {State} from "@/store/modules/web3/state";
import {RootState} from "@/store/modules/RootState";
import {
    SET_IS_ENABLE,
    SET_HOLDER,
    SET_ID_TOKEN,
    SET_CONNECTED_WALLET,
    SET_SIGNATURE,
    SET_PROCESSING,
    CLEAN,
    LOGIN_ACTION,
    LOGOUT_ACTION,
    CONNECT_ACTION,
    SELECT_WALLET,
    INIT_WALLET, SET_ADDRESS, SET_PROVIDER
} from "@/store/modules/web3/constant";
import {Web3Provider} from "@ethersproject/providers";

export const actions: ActionTree<State, RootState> = {
    async [INIT_WALLET]({state, commit, dispatch}) {
        state.web3Onboard.state.select().subscribe((update) => {
            if (update.wallets.length <= 0) {
                commit(CLEAN);
            } else {
                const updateWalletAddress = update.wallets[0].accounts[0].address;

                let currentWalletAddress = null;
                // @ts-ignore
                if (state.connectedWallet && state.connectedWallet.accounts) {
                    // @ts-ignore
                    currentWalletAddress = state.connectedWallet?.accounts[0]?.address;
                }

                commit(SET_CONNECTED_WALLET, update.wallets[0]);
                if (updateWalletAddress !== currentWalletAddress) {
                    dispatch(SELECT_WALLET, update.wallets[0]);
                }
            }
        });
    },
    async [CONNECT_ACTION]({state}) {
        await state.web3Onboard.connectWallet();
    },
    async [LOGOUT_ACTION]({state, commit}) {
        localStorage.removeItem("address");
        localStorage.removeItem("signature");
        localStorage.removeItem("holder");
        localStorage.removeItem("idToken");
        localStorage.removeItem("onboard.js:last_connected_wallet");

        commit(SET_ADDRESS, "");
        commit(SET_SIGNATURE, "");
        commit(SET_HOLDER, false);
        commit(SET_ID_TOKEN, "");
        commit(SET_PROVIDER, null);

        const currentWallet = await state.web3Onboard.state.get().wallets[0];
        await state.web3Onboard.disconnectWallet({label: currentWallet.label});
    },
    async [LOGIN_ACTION]({commit}, payload) {
        localStorage.removeItem("token");
        localStorage.removeItem("idToken");
        localStorage.removeItem("holder");

        commit(SET_ID_TOKEN, payload.idToken);

        let holder = undefined;
        if (payload.account != null) {
            holder = await checkHolderToken(payload.account);
        }
        //TODO: Stupid cast variable
        commit(SET_HOLDER, !!holder);
        commit(SET_IS_ENABLE, true);
        commit(SET_PROCESSING, false);
    },
    async [SELECT_WALLET]({state, commit, dispatch}, wallet) {
        if (localStorage.getItem("address") !== null) {
            commit(SET_ADDRESS, localStorage.getItem("address"));
        }
        if (localStorage.getItem("signature") !== null) {
            commit(SET_SIGNATURE, localStorage.getItem("signature"));
        }
        if (localStorage.getItem("idToken") !== null) {
            commit(SET_ID_TOKEN, localStorage.getItem("idToken"));
        }
        if (localStorage.getItem("holder") !== null) {
            commit(SET_HOLDER, JSON.parse(localStorage.getItem("holder") || ""));
        }

        if (wallet) {
            const currentAddress = wallet.accounts[0]?.address;
            if (!state.signature || !state.address || state.address !== currentAddress) {
                commit(SET_PROCESSING, true);

                let [status_code, nonceReq] = await getNonce(currentAddress);

                if (status_code === 404 || nonceReq === "") {
                    const registered = await register(currentAddress);
                    if (registered == null) {
                        return;
                    } else {
                        nonceReq = registered.nonce;
                    }
                } else if (status_code !== 200) {
                    return;
                }
                // @ts-ignore
                state.provider = new Web3Provider(wallet.provider);
                const signature = await signMessage(state.provider, nonceReq);
                if (!signature) {
                    commit(SET_PROCESSING, false);
                    dispatch(LOGOUT_ACTION);
                    return;
                }

                commit(SET_ADDRESS, currentAddress)
                commit(SET_SIGNATURE, signature);

                let result = await performLogin(currentAddress, signature);

                await dispatch(LOGIN_ACTION, {
                    account: currentAddress,
                    idToken: result.idToken
                });
            } else {
                // @ts-ignore
                state.provider = new Web3Provider(wallet.provider);
                commit(SET_IS_ENABLE, true);
            }
        }
    }
}
