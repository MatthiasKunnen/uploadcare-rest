declare module 'uploadcare-rest' {
    import { AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios';

    export class Uploadcare {
        files: UploadcareFilesWrapper;
        upload: UploadWrapper;

        constructor(
            publicKey: string,
            privateKey: string,
            axiosConfig?: Partial<AxiosRequestConfig>,
        );
    }

    export interface Storable {

        /**
         * Store the image.
         * @default undefined The default project store method will be used
         */
        store?: boolean;
    }

    export interface ImageInfo {
        height: number;
        width: number;
        geo_location: any;
        datetime_original: string | null;
        format: string;
    }

    export interface UploadImageResult {
        datetime_removed: string | null;
        datetime_stored: string | null;
        datetime_uploaded: string;
        image_info: ImageInfo;
        is_image: boolean | null;
        is_ready: boolean;
        mime_type: string;
        original_file_url?: string;
        original_filename: string;
        size: number;
        source: string | null;
        url: string;
        uuid: string;
    }

    /**
     * This class takes care of all /files methods.
     */
    export class UploadcareFilesWrapper {
        private http;
        constructor(http: AxiosInstance);

        /**
         * Copy an uploaded file to a specified storage.
         * @param source Either CDN URL or UUID.
         */
        copy(source: string, options?: CopyOptions): AxiosPromise<CopyResult>;

        /**
         * Removes a file by UUID.
         * @param id The UUID of the file to delete.
         */
        remove(id: string): AxiosPromise<UploadImageResult>;

        /**
         * Stores files. Maximum 100, see Uploadcare documentation.
         * https://uploadcare.com/documentation/rest/#files-storage
         * @param files An array containing the UUIDs of the files to store.
         */
        store(files: Array<string>): AxiosPromise<StoreResult>;
    }

    export interface CopyOptions extends Storable {
        make_public?: string;
        pattern?: string;
    }

    export interface CopyResult {
        type: 'file' | 'url';
        result: UploadImageResult | string;
    }

    export interface StoreResult {

        /**
         * Contains problems, if any.
         * The key contains the UUID of the file that ecountered a problem.
         * The value describes the problem.
         * This object will ALWAYS be present, contradictory to the API
         * documentation. You can check if any errors have occurred using
         * `Object.keys(data.problems).length > 0`.
         */
        problems: {[key: string]: string};
        result: Array<UploadImageResult>;
        status: string;
    }

    export enum StoreEnum {
        NoStore = 0,
        Store = 1,
        Auto = 'auto',
    }

    export interface FromUrlOptions {

        /**
         * 0 — files do not get stored upon uploading.
         * 1 — files get stored upon uploading. Requires the "automatic file storing"
         * setting to be enabled.
         * auto — file storing works in line with your project settings.
         * @default auto
         */
        store?: StoreEnum;

        /**
         * {@link https://uploadcare.com/docs/api_reference/upload/from_url/#url-duplicates}
         */
        check_URL_duplicates?: 0 | 1;

        /**
         * {@link https://uploadcare.com/docs/api_reference/upload/from_url/#url-duplicates}
         */
        save_URL_duplicates?: 0 | 1;
    }

    export interface FromUrlResponse {
        type: 'token';

        /**
         * Token used to fetch file status.
         */
        token: string;
    }

    export interface FromUrlFileResponse {
        done: number;
        file_id: string;
        filename: string;
        image_info: ImageInfo | any;
        is_image: boolean;
        is_ready: true;
        is_stored: boolean;
        mime_type: string;
        original_filename: string;
        size: number;
        total: number;
        type: 'file_info';
        uuid: string;
        video_info: any;
    }

    export type FromUrlStatusResponse = FromUrlStatusErrorResponse
        | FromUrlStatusProgressResponse
        | FromUrlStatusSuccessResponse;

    export interface FromUrlStatusErrorResponse {
        status: 'error';
        error: string;
    }

    export interface FromUrlStatusProgressResponse {
        status: 'progress' | 'unknown';
    }

    export interface FromUrlStatusSuccessResponse extends FromUrlFileResponse {
        status: 'success';
    }

    /**
     * This class takes care of all Upload API methods.
     */
    export class UploadWrapper {

        constructor(http: AxiosInstance);

        /**
         * Upload files by URL.
         * {@link https://uploadcare.com/docs/api_reference/upload/from_url/}
         * @param url The URL of the image to upload.
         * @param options Configure options such as storing behavior.
         */
        fromUrl(
            url: string,
            options?: FromUrlOptions,
        ): AxiosPromise<FromUrlResponse | FromUrlFileResponse>;

        /**
         * Get the status of an upload fromUrl.
         * {@link https://uploadcare.com/docs/api_reference/upload/from_url/#status-check}
         * @param token
         */
        fromUrlStatus(token: string): AxiosPromise<FromUrlStatusResponse>;

        /**
         * Wait for a file to become available.
         * @param token The token of the file to check
         * @param interval The poll interval in milliseconds. Default 1000.
         */
        awaitFile(token: string, interval?: number): Promise<FromUrlStatusSuccessResponse>;

        /**
         * Upload files by URL and wait for the upload to complete.
         * @see UploadcareFilesWrapper.fromUrl
         * @param url The URL of the image to upload.
         * @param options Configure options such as storing behavior.
         * @param interval The poll interval in milliseconds. Default 1000.
         */
        awaitFromUrl(
            url: string,
            options?: FromUrlOptions,
            interval?: number,
        ): Promise<FromUrlStatusSuccessResponse | FromUrlFileResponse>;
    }
}
