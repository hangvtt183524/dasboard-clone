import axios from "axios";
import {ResponseData, ResponseStatus} from "@/api/transaction/trans";
import {getIdToken} from "@/api/token";

const BASE_URL = "https://egn5817exd.execute-api.us-east-1.amazonaws.com/Prod/api/v1"

export async function getAirdropHolder(address: string, times: number) {

    return axios.get(BASE_URL + "/airdrop/holder", {
        params: {
            address: address,
            times: times
        },
        withCredentials: false,
        headers: {
            "Content-Type": "application/json",
            'Authorization': getIdToken(),
        }
    }).then(ResponseData);
}

export async function updateAirdropHolder(address: string) {
    return axios.post(BASE_URL + "/airdrop/holder", {
        address: address,
        action: 1,
    }, {
        withCredentials: false,
        headers: {
            "Content-Type": "application/json",
            'Authorization': getIdToken(),
        }
    }).then(ResponseStatus);
}
