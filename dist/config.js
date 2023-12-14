"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = exports.firestore = void 0;
const firestore_1 = require("@google-cloud/firestore");
const storage_1 = require("@google-cloud/storage");
exports.firestore = new firestore_1.Firestore({
    projectId: process.env.GOOGLE_CLOUD_PROJECT,
    keyFilename: 'plantherbs-f74f36e3647a.json' // Sesuaikan dengan path ke file kredensial Anda jika menggunakan file
});
exports.storage = new storage_1.Storage({
    projectId: process.env.GOOGLE_CLOUD_PROJECT,
    keyFilename: 'plantherbs-f74f36e3647a.json' // Sesuaikan dengan path ke file kredensial Anda jika menggunakan file
});
