# Uploadcare Rest
[![npm version](https://img.shields.io/npm/v/uploadcare-rest.svg?style=for-the-badge)](https://www.npmjs.com/package/uploadcare-rest)

This is a wrapper around the API made available by uploadcare.
The library is written in TypeScript and has typings available.

The methods will be implemented gradually.

## Currently implemented

### Files
- copy
- remove
- store

## Example
```TypeScript
const uploader = new Uploadcare(
    config.uploadcare.publicKey,
    config.uploadcare.privateKey,
);

// Copy a file to the CDN storage, for example a crop preview
const response = await uploader.files.copy(cdnUrlOrId);
const image = response.data;

// Check the type of the image. url for custom storage, file otherwise.
if (image.type === 'file') {
    // Type cast for TypeScript only
    const result = <UploadImageResult>image.result;

    // Store the copied file (necessary when Auto store is disallowed)
    const storeResult = await uploader.files.store([result.uuid]);

    if (Object.keys(storeResult.problems).length > 0) {
        console.error(storeResult.problems);
    }
}
```
