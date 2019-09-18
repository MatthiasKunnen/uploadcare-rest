# Uploadcare Rest
[![npm version](https://img.shields.io/npm/v/uploadcare-rest.svg?logo=npm&style=for-the-badge)](https://www.npmjs.com/package/uploadcare-rest)

This is a wrapper around the API made available by uploadcare.
The library is written in TypeScript and has typings available.

The methods will be implemented gradually.

## Currently implemented

### Files
- copy
- remove
- store

**Example**

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
}
```

### Upload
- [From URL](https://uploadcare.com/docs/api_reference/upload/from_url/)

**Example**

```TypeScript
const uploader = new Uploadcare(
    config.uploadcare.publicKey,
    config.uploadcare.privateKey,
);

const file = await uploader.upload.awaitFromUrl('https://picsum.photos/200/300/?random');
// That's all, the library takes care of checking the upload progress
// If you're not interested in waiting for the file, use the following
const idc = await uploader.upload.fromUrl('https://picsum.photos/200/300/?random');
```
