import {AxiosResponse} from "axios";

export const ResponseConfigData = (res: AxiosResponse<any>) => {
    if (res) {
        return res.data
    }
    return undefined
}
