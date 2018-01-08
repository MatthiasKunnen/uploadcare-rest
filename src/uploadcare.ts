import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export class Uploadcare {

    private http: AxiosInstance;

    constructor(
        publicKey: string,
        privateKey: string,
        axiosConfig: Partial<AxiosRequestConfig> = {},
    ) {
        this.http = axios.create({
            // 60 seconds timeout
            timeout: 60000,

            // Follow up to 10 HTTP 3xx redirects
            maxRedirects: 10,

            // Maximum content length 50MBs
            maxContentLength: 50 * 1000 * 1000,

            ...axiosConfig,
        });

        this.http.defaults.baseURL = 'https://api.uploadcare.com';
        this.http.defaults.headers.common['Authorization']
            = `Uploadcare.Simple ${publicKey}:${privateKey}`;

        this.http.defaults.headers.post['Content-Type']
            = 'application/x-www-form-urlencoded';
    }
}
