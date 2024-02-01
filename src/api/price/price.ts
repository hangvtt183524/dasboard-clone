import axios from "axios";
import {ResponseData} from "@/api/transaction/trans";

const BASE_URL = "https://54e4vvjf9d.execute-api.us-east-1.amazonaws.com/Prod/api/v1"

export async function getPriceToken() {

    return axios.get(BASE_URL + "/price/token", {
        params: {
            token: "0x0e6fa9c050c8a707e7f56a2b3695665e4f9eac9b",
            tokenbase: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
            network: "ethereum"
        },
        withCredentials: false,
        headers: {
            "Content-Type": "application/json",
        }
    }).then(ResponseData);
}
