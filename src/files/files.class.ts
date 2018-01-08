import { AxiosInstance, AxiosPromise } from 'axios';

import {
    CopyOptions,
    UploadFromUrlResult,
} from './files.interface';

/**
 * This class takes care of all /files methods.
 */
export class UploadcareFilesWrapper {

    constructor(private http: AxiosInstance) {
    }

    /**
     * Copy an uploaded file to a specified storage.
     * @param source Either CDN URL or UUID.
     */
    copy(source: string, options?: CopyOptions): AxiosPromise<UploadFromUrlResult> {
        return this.http.post<UploadFromUrlResult>('/files/', {
            ...options,
            source,
        });
    }
}
