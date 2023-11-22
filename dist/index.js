"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const firestore_1 = require("@google-cloud/firestore");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const firestore = new firestore_1.Firestore({
    projectId: process.env.GOOGLE_CLOUD_PROJECT,
    keyFilename: 'plantherbs-f74f36e3647a.json' // Sesuaikan dengan path ke file kredensial Anda jika menggunakan file
});
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
app.get('/api/data', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const snapshot = yield firestore.collection('example').get();
        const data = [];
        snapshot.forEach((doc) => {
            data.push(Object.assign({ id: doc.id }, doc.data()));
        });
        res.json(data);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}));
app.post('/api/data', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const { name, umur } = req.body; // Ganti dengan nama field sesuai kebutuhan
        const docRef = yield firestore.collection('example').add({
            nama: name,
            umur,
            // ...Tambahkan field lain sesuai kebutuhan
        });
        res.json({ id: docRef.id });
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}));
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
