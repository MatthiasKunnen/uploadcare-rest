declare module 'uploadcare-rest' {
    import { AxiosRequestConfig } from 'axios';

    export class Uploadcare {
        private http;
        constructor(
            publicKey: string, 
            privateKey: string, 
            axiosConfig?: Partial<AxiosRequestConfig>,
        );
    }
}
