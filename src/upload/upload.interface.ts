import { ImageInfo } from '../uploadcare.interface';

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
