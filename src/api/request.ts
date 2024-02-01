import axios from 'axios'
import router from "@/routes";
import {authHeader} from "@/helper/auth-header";
import {encodeSession} from "@/services/JWTToken";
import {errorStatus, IsDebug} from '@/helper/error-status';
import axiosRetry from 'axios-retry';

const http = axios.create({
    baseURL: "https://api.roboglobal.info/api/v1" //process.env.VUE_APP_BASE_URL
});
axiosRetry(http, {
        retries: 3, // number of retries
        retryDelay: (retryCount) => {
            if (IsDebug()) {
                console.log(`retry attempt: ${retryCount}`);
            }
            return 500; // time interval between retries
        },
        retryCondition: () => true
    }
);
http.interceptors.request.use(
    (config) => {
        let header = authHeader()
        if (header) {
            config.headers = header;
        }
        return config
    },
    error => {
        return Promise.reject(error);
    }
);
http.interceptors.response.use((response) => {

        if (response && (response.status === 200 || response.status === 201)) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    }, error => {
        if (error && error.response && error.response.status) {
            if (IsDebug()) {
                console.log(error.response);
            }
            switch (error.response.status) {
                case 400:
                    errorStatus(error.response.data);
                    encodeSession("8j5rmx3aThtCGPLf");
                    error.config.baseURL = undefined;
                    break;
                case 401:
                case 403:
                    router.push({path: '/403'});
                    break;
                case 404:
                    alert('Page Not Exist');
                    break;
                case 500:
                case 502:
                    router.push({path: '/500'});
                    break;
            }
            return Promise.reject(error.response);
        }
    }
)

export const getRequest = (url: string, params = {}) => {
    return http.get(url, {params: {...params}})
}

export const postRequest = (url: string, params = {}) => {
    return http.post(url, params)
}
