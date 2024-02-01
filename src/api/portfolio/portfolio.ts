import axios from "axios";
import {ResponseData} from "@/api/transaction/trans";
import {getIdToken} from "@/api/token";

const BASE_URL = "https://fvd3j8j8bi.execute-api.us-east-1.amazonaws.com/Prod/api/v1"

export async function getPortfolioHolder(address: string) {
    return axios.post(BASE_URL + "/portfolio/calc", {
            "wallet": address,
            "type": "erc20",
            "token": "0x0e6fa9c050c8a707e7f56a2b3695665e4f9eac9b",
            "network": "ethereum"
        },
        {
            withCredentials: false,
            headers: {
                "Content-Type": "application/json",
                'Authorization': getIdToken(),
            }
        }).then(ResponseData);
}
