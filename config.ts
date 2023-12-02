import { Firestore } from '@google-cloud/firestore';
import { Storage } from '@google-cloud/storage';

export const firestore = new Firestore({
    projectId: process.env.GOOGLE_CLOUD_PROJECT, // Gunakan ID proyek Firestore yang sesuai
    keyFilename: 'plantherbs-f74f36e3647a.json' // Sesuaikan dengan path ke file kredensial Anda jika menggunakan file
  });


  export const storage = new Storage({
    projectId: process.env.GOOGLE_CLOUD_PROJECT, // Gunakan ID proyek Firestore yang sesuai
    keyFilename: 'plantherbs-f74f36e3647a.json' // Sesuaikan dengan path ke file kredensial Anda jika menggunakan file
  });


 