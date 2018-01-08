import {
    Storable,
    UploadImageResult,
} from '../uploadcare.interface';

export interface CopyOptions extends Storable {
    make_public?: string;
    pattern?: string;
}

export interface UploadFromUrlResult {
    type: 'file' | 'url';
    result: UploadImageResult | string;
}
