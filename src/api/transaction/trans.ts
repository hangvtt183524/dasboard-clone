import {AxiosResponse} from 'axios'

export const ResponseData = (res: AxiosResponse<any>) => {
    if (res) {
        return res.data
    }
    return undefined
}
export const ResponseStatus = (res: AxiosResponse<any>) => {
    if (res) {
        return res.data.message
    }
    return undefined
}
