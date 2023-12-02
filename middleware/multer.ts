import Multer, { memoryStorage, Multer as MulterType } from 'multer';
export const multer: MulterType = Multer({
    storage: memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 },
});