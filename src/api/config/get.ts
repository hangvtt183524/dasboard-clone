import axios from "axios";
import {ResponseConfigData} from "@/api/config/eve"

const BASE_URL = "https://eve.roboglobal.info/api/v1"

export async function getEveConfigVersion() {
    return axios.get(BASE_URL + "/config/dashboard", {
        withCredentials: false,
        headers: {
            "Content-Type": "application/json",
        }
    }).then(ResponseConfigData);
}
