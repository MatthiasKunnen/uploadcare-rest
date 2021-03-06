import { AxiosInstance, AxiosPromise } from 'axios';

import { UploadImageResult } from '../uploadcare.interface';
import {
    CopyOptions,
    CopyResult,
    StoreResult,
} from './files.interface';

/**
 * This class takes care of all /files methods.
 */
export class UploadcareFilesWrapper {

    constructor(
        private readonly http: AxiosInstance,
    ) {
    }

    /**
     * Copy an uploaded file to a specified storage.
     * @param source Either CDN URL or UUID.
     */
    copy(source: string, options?: CopyOptions): AxiosPromise<CopyResult> {
        return this.http.post<CopyResult>('/files/', {
            ...options,
            source,
        });
    }

    /**
     * Removes a file by UUID.
     * @param id The UUID of the file to delete.
     */
    remove(id: string): AxiosPromise<UploadImageResult> {
        return this.http.delete(`/files/${id}/`);
    }

    /**
     * Stores files. Maximum 100, see Uploadcare documentation.
     * https://uploadcare.com/documentation/rest/#files-storage
     * @param files An array containing the UUIDs of the files to store.
     */
    store(files: Array<string>): AxiosPromise<StoreResult> {
        if (files.length > 100) {
            throw new Error('Maximum files exceeded. This request supports'
                + ' up to 100 files.');
        }

        return this.http.put<StoreResult>('/files/storage/', files);
    }
}
