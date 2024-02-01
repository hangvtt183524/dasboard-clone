import axios from "axios";
import {ResponseData} from "@/api/transaction/trans";
import {getIdToken} from "@/api/token";
import {EventVote} from "@/entities/ProposalDetail";

const BASE_URL = "https://8w1x86dpyb.execute-api.us-east-1.amazonaws.com/Prod/api/v1"

export async function getVoteProposal() {

    return axios.get(BASE_URL + "/dao/list", {
        params: {
            network: process.env.VUE_APP_NETWORK
        },
        withCredentials: false,
        headers: {
            "Content-Type": "application/json",
            'Authorization': getIdToken(),
        }
    }).then(ResponseData);
}

export async function getHotProposal() {

    return axios.get(BASE_URL + "/dao/hot", {
        params: {},
        withCredentials: false,
        headers: {
            "Content-Type": "application/json",
            'Authorization': getIdToken(),
        }
    }).then(ResponseData);
}

export async function getAddressVoted(pId: number, _type: EventVote) {

    return axios.get(BASE_URL + "/dao/result", {
        params: {
            type: _type,
            network: process.env.VUE_APP_NETWORK,
            proposal_id: pId
        },
        withCredentials: false,
        headers: {
            "Content-Type": "application/json",
            'Authorization': getIdToken(),
        }
    }).then(ResponseData);
}
