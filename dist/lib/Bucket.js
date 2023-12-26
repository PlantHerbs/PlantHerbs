"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImgUpload = void 0;
const config_1 = require("../config");
const bucketName = 'plantherbs-bucket';
const bucket = config_1.storage.bucket(bucketName);
function getPublicUrl(filename) {
    return `https://storage.googleapis.com/${bucketName}/${filename}`;
}
exports.ImgUpload = {
    uploadToGcs: (req, res, next) => {
        var _a;
        const reqFile = req.file;
        // console.log(reqFile)
        // console.log('test')
        if (!reqFile)
            return next();
        // const currentDate: Date = new Date();
        // const gcsname: string = formatDate(currentDate);
        const file = bucket.file(`input/${(_a = req.file) === null || _a === void 0 ? void 0 : _a.originalname}`);
        const stream = file.createWriteStream({
            metadata: {
                contentType: reqFile.mimetype
            }
        });
        stream.on('error', (err) => {
            reqFile.cloudStorageError = err;
            next(err);
        });
        stream.on('finish', () => {
            // file.name.replace
            reqFile.cloudStorageObject = file.name.replace('input/', '');
            // reqFile.cloudStoragePublicUrl = getPublicUrl(gcsname);
            next();
        });
        stream.end(reqFile.buffer);
    }
};
exports.default = exports.ImgUpload;
