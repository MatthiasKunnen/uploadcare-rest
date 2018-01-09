import {
    Storable,
    UploadImageResult,
} from '../uploadcare.interface';

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
     */
    problems?: {[key: string]: string};
    result: Array<UploadImageResult>;
    status: string;
}
