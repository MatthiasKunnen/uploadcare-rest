import { AxiosInstance, AxiosPromise } from 'axios';

import { sleep } from '../util';
import {
    FromUrlFileResponse,
    FromUrlOptions,
    FromUrlResponse,
    FromUrlStatusResponse,
    FromUrlStatusSuccessResponse,
    StoreEnum,
} from './upload.interface';

const defaultFromUrlOptions: FromUrlOptions = {
    store: StoreEnum.Auto,
};

/**
 * This class takes care of all Upload API methods.
 */
export class UploadWrapper {

    constructor(
        private readonly http: AxiosInstance,
    ) {
    }

    /**
     * Upload files by URL.
     * {@link https://uploadcare.com/docs/api_reference/upload/from_url/}
     * @param url The URL of the image to upload.
     * @param options Configure options such as storing behavior.
     */
    fromUrl(
        url: string,
        options?: FromUrlOptions,
    ): AxiosPromise<FromUrlResponse | FromUrlFileResponse> {
        return this.http.get<FromUrlResponse | FromUrlFileResponse>('/from_url/', {
            params: {
                ...defaultFromUrlOptions,
                ...options,
                source_url: url,
            },
        });
    }

    /**
     * Get the status of an upload fromUrl.
     * {@link https://uploadcare.com/docs/api_reference/upload/from_url/#status-check}
     * @param token
     */
    fromUrlStatus(token: string): AxiosPromise<FromUrlStatusResponse> {
        return this.http.get<FromUrlStatusResponse>('/from_url/status/', {
            params: {
                token,
            },
        });
    }

    /**
     * Wait for a file to become available.
     * @param token The token of the file to check
     * @param interval The poll interval in milliseconds.
     */
    async awaitFile(token: string, interval = 1000): Promise<FromUrlStatusSuccessResponse> {
        while (true) {
            const response = await this.fromUrlStatus(token);

            if (response.data.status === 'success') {
                return response.data;
            }

            if (response.data.status === 'error') {
                throw new Error(response.data.error);
            }

            await sleep(interval);
        }
    }

    /**
     * Upload files by URL and wait for the upload to complete.
     * @see UploadcareFilesWrapper.fromUrl
     * @param url The URL of the image to upload.
     * @param options Configure options such as storing behavior.
     * @param interval The poll interval in milliseconds.
     */
    async awaitFromUrl(
        url: string,
        options?: FromUrlOptions,
        interval = 1000,
    ): Promise<FromUrlStatusSuccessResponse | FromUrlFileResponse> {
        const response = await this.fromUrl(url, options);

        if (response.data.type === 'file_info') {
            return response.data;
        }

        return this.awaitFile(response.data.token, interval);
    }
}
