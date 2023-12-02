import { storage } from "../config";
import { Request, Response, NextFunction } from "express";
// import dateFormat from 'dateformat';
import { formatDate } from "../helpers/formatDate";
import { File } from '@google-cloud/storage';

const bucketName = 'examplelalala';
const bucket = storage.bucket(bucketName);

interface ImgUploadType {
    uploadToGcs: (req: Request, res: Response, next: NextFunction) => void;
}

// Mendefinisikan tipe data untuk custom file
interface CustomFile extends File {
    cloudStorageError?: any;
    cloudStorageObject?: string;
    cloudStoragePublicUrl?: string;
    mimetype?: any;
    buffer?: any;
}

function getPublicUrl(filename: string): string {
    return `https://storage.googleapis.com/${bucketName}/${filename}`;
}

export const ImgUpload: ImgUploadType = {
    uploadToGcs: (req, res, next) => {
        const reqFile = req.file as CustomFile | undefined;
        // console.log(reqFile)
        // console.log('test')

        if (!reqFile) return next();
        const currentDate: Date = new Date();

        const gcsname: string = formatDate(currentDate);
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

export default ImgUpload;
