import "@/store";
import store from "@/store";

export const getIdToken = () => {
    return "Bearer " + store.getters["Web3ModuleStore/getIdToken"]
}
export const parseToken = () => {
    try {
        return JSON.parse(atob(store.getters["Web3ModuleStore/getIdToken"].split('.')[1]));
    } catch (e) {
        return null;
    }
};

