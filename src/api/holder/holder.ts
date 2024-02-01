import axios from "axios";
import {getIdToken} from "@/api/token";

const BASE_URL = "https://yikphp0kf8.execute-api.us-east-1.amazonaws.com/Prod/api/v1"

export async function checkHolderToken(address: string) {
    try {
        return await axios.get(BASE_URL + "/token/holder", {
            params: {
                wallet: address,
                token: process.env.VUE_APP_MAIN_TOKEN_CONTRACT,
                network: process.env.VUE_APP_NETWORK
            },
            withCredentials: false,
            headers: {
                "Content-Type": "application/json",
                'Authorization': getIdToken(),
            }
        });
    } catch (error) {
        return undefined;
    }
}
