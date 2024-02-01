import axios from "axios";
import {ResponseData} from "@/api/transaction/trans";
import {getIdToken} from "@/api/token";

const BASE_URL = "https://1z3swsl9vi.execute-api.us-east-1.amazonaws.com/Prod/api/v1"

export async function getMigrateHolder(address: string) {

    return axios.get(BASE_URL + "/migrate/holder", {
        params: {
            address: address,
        },
        withCredentials: false,
        headers: {
            "Content-Type": "application/json",
            'Authorization': getIdToken(),
        }
    }).then(ResponseData);
}
