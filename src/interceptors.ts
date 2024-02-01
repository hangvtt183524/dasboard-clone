import axios, {AxiosError, AxiosResponse} from 'axios';
import * as Sentry from "@sentry/vue";

export default function interceptorsSetup() {
    axios.interceptors.response.use(
        (response: AxiosResponse) => response,
        (error: AxiosError) => {
            Sentry.captureException(error);
            return Promise.reject(error);
        },
    );
}
