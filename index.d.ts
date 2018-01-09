declare module 'uploadcare-rest' {
    import { AxiosRequestConfig, AxiosInstance, AxiosPromise } from 'axios';

    export class Uploadcare {
        files: UploadcareFilesWrapper;
        private http;
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
    }

    export interface CopyOptions extends Storable {
        make_public?: string;
        pattern?: string;
    }

    export interface CopyResult {
        type: 'file' | 'url';
        result: UploadImageResult | string;
    }
}
