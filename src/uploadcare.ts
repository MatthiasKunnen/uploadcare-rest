import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import { UploadcareFilesWrapper } from './files/files.class';
import { UploadWrapper } from './upload/upload.class';

export class Uploadcare {

    readonly files: UploadcareFilesWrapper;
    readonly upload: UploadWrapper;

    private readonly http: AxiosInstance;
    private readonly httpUpload: AxiosInstance;

    constructor(
        publicKey: string,
        privateKey: string,
        axiosConfig: Partial<AxiosRequestConfig> = {},
    ) {
        axiosConfig = {
            // 60 seconds timeout
            timeout: 60000,

            // Follow up to 10 HTTP 3xx redirects
            maxRedirects: 10,

            // Maximum content length 50MBs
            maxContentLength: 50 * 1000 * 1000,

            ...axiosConfig,
        };

        this.http = axios.create(axiosConfig);

        this.http.defaults.baseURL = 'https://api.uploadcare.com';
        this.http.defaults.headers.common['Authorization']
            = `Uploadcare.Simple ${publicKey}:${privateKey}`;

        this.http.defaults.headers.post['Content-Type']
            = 'application/x-www-form-urlencoded';

        this.files = new UploadcareFilesWrapper(this.http);

        this.httpUpload = axios.create(axiosConfig);
        this.httpUpload.defaults.baseURL = 'https://upload.uploadcare.com/';
        this.httpUpload.defaults.params = {
            pub_key: publicKey,
        };

        this.upload = new UploadWrapper(this.httpUpload);
    }
}
