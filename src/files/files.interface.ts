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
     * This object will ALWAYS be present, contradictory to the API
     * documentation. You can check if any errors have occurred using
     * `Object.keys(data.problems).length > 0`.
     */
    problems: {[key: string]: string};
    result: Array<UploadImageResult>;
    status: string;
}
