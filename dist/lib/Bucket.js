"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImgUpload = void 0;
const config_1 = require("../config");
// import dateFormat from 'dateformat';
const formatDate_1 = require("../helpers/formatDate");
const bucketName = 'examplelalala';
const bucket = config_1.storage.bucket(bucketName);
function getPublicUrl(filename) {
    return `https://storage.googleapis.com/${bucketName}/${filename}`;
}
exports.ImgUpload = {
    uploadToGcs: (req, res, next) => {
        const reqFile = req.file;
        console.log(reqFile);
        console.log('test');
        if (!reqFile)
            return next();
        const currentDate = new Date();
        const gcsname = (0, formatDate_1.formatDate)(currentDate);
        const file = bucket.file(gcsname);
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
            reqFile.cloudStorageObject = gcsname;
            reqFile.cloudStoragePublicUrl = getPublicUrl(gcsname);
            next();
        });
        stream.end(reqFile.buffer);
    }
};
exports.default = exports.ImgUpload;
