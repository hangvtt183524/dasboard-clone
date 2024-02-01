import {getRequest} from '../request'
import {ResponseData} from "@/api/transaction/trans";

export const getCardMMC = () => {
    let path = "/portfolio/getvol"
    return getRequest(path, {}).then(ResponseData)
}

export const getListEvent = (offset: number, limit: number) => {
    let path = "/event/list"
    return getRequest(path, {
        "offset": offset,
        "limit": limit
    }).then(ResponseData)
}

export const getEventRegList = (offset: number, limit: number, event_id: number) => {
    let path = "/event_register/history"
    return getRequest(path, {
        "offset": offset,
        "limit": limit,
        "event_id": event_id
    }).then(ResponseData)
}

export const getEventPostList = (offset: number, limit: number, event_id: number) => {
    let path = "/event_post/history"
    return getRequest(path, {
        "offset": offset,
        "limit": limit,
        "event_id": event_id
    }).then(ResponseData)
}

export const getListContent = (offset: number, limit: number, event_id: number) => {
    let path = "/event_post/contest"
    return getRequest(path, {
        "offset": offset,
        "limit": limit,
        "event_id": event_id
    }).then(ResponseData)
}

export const getListHistoryVote = (offset: number, limit: number, event_id: number) => {
    let path = "/event_log/history"
    return getRequest(path, {
        "offset": offset,
        "limit": limit,
        "event_id": event_id
    }).then(ResponseData)
}

export const getCheckRef = () => {
    let path = "/ref/check"
    return getRequest(path).then(ResponseData)
}

export const getHisRef = (offset: number, limit: number) => {
    let path = "/ref/get_history"
    return getRequest(path, {
        "offset": offset,
        "limit": limit
    }).then(ResponseData)
}

export const getCheckReg = (event_id: number) => {
    let path = "/event_register/check"
    return getRequest(path, {
        "event_id": event_id
    }).then(ResponseData)
}

export const getStatusEvent = (event_id: number) => {
    let path = "/event/status"
    return getRequest(path, {
        "event_id": event_id
    }).then(ResponseData)
}

export const getRefCode = (event_id: number) => {
    let path = "/refcode/get"
    return getRequest(path, {
        "eventId": event_id
    }).then(ResponseData)
}

export const getTypeEvent = (event_id: number) => {
    let path = "/event/type"
    return getRequest(path, {
        "event_id": event_id
    }).then(ResponseData)
}
