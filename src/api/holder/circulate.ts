import axios from "axios";
import {ResponseData} from "@/api/transaction/trans";

const BASE_URL = "https://pq04josdi7.execute-api.us-east-1.amazonaws.com/Prod/api/v1"

export async function getCirculate() {
    return axios.get(BASE_URL + "/token/circulate", {
        params: {
            token: process.env.VUE_APP_MAIN_TOKEN_CONTRACT,
            network: process.env.VUE_APP_NETWORK
        },
        withCredentials: false,
        headers: {
            "Content-Type": "application/json",
        }
    }).then(ResponseData);
}
