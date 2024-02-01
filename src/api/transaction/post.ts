import {postRequest} from '../request'
import {ResponseData} from "@/api/transaction/trans";
import {IEventReg} from '@/entities/EventReg'
import {IPostLinkReg} from '@/entities/postLinkReg'
import {IContentVote} from '@/entities/postVoteContent'
import {IPostRef} from "@/entities/PostRef";
import {IPostIDToGetCodeRef} from "@/entities/PostIDToGetCodeRef";

export const postUserProfileRegister = (params: IEventReg) => {
    let path = "/event_register/register";
    return postRequest(path, params).then(ResponseData)
}

export const postLinkReg = (params: IPostLinkReg) => {
    let path = "/event_post/register_content";
    return postRequest(path, params).then(ResponseData)
}

export const postContentVote = (params: IContentVote) => {
    let path = "/event_log/vote_content";
    return postRequest(path, params).then(ResponseData)
}
export const postRef = (params: IPostRef) => {
    let path = "/ref/add";
    return postRequest(path, params).then(ResponseData)
}

export const postIDToGetCodeRef = (params: IPostIDToGetCodeRef) => {
    let path = "/refcode/gen";
    return postRequest(path, params).then(ResponseData)
}