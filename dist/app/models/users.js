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
exports.loginUser = exports.addUser = void 0;
const config_1 = require("../../config");
const token_1 = require("./token");
const nodeMailer_1 = require("../../lib/nodeMailer");
const speakeasy_1 = __importDefault(require("speakeasy"));
const crypto_1 = require("crypto");
const secret = speakeasy_1.default.generateSecret({ length: 20 });
const algorithm = 'aes-256-cbc';
const key = (0, crypto_1.randomBytes)(32); // 32 bytes for AES-256
const iv = (0, crypto_1.randomBytes)(16);
const addUser = (data, image) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullName, email, password } = data;
    const cipher = (0, crypto_1.createCipheriv)(algorithm, key, iv);
    let encrypted = cipher.update(password, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const docRef = yield config_1.firestore.collection('users').add({
        full_name: fullName,
        email,
        password: encrypted,
        image,
        verified: false
        // ...Tambahkan field lain sesuai kebutuhan
    });
    const token = speakeasy_1.default.totp({
        secret: secret.ascii || 'RAHASIA',
        encoding: 'ascii',
        digits: 6, // Number of digits in the OTP
    });
    const datas = {
        EMAIL: email,
        subject: "Email Verification",
        // text: "hello word",
        // html : htmlToSend,
        html: `<p>ini kode otp mu : ${token}</p>`, // eslint-disable-line
    };
    yield (0, nodeMailer_1.sendEmail)(datas);
    const addTokens = yield (0, token_1.addToken)(docRef.id, token);
    if (docRef && addTokens) {
        return true;
    }
});
exports.addUser = addUser;
const loginUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const decipher = (0, crypto_1.createDecipheriv)(algorithm, key, iv);
    let decrypted = decipher.update(data.password_encrypt, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    console.log(decrypted);
    if (decrypted !== data.password_body) {
        return false;
    }
    return true;
});
exports.loginUser = loginUser;
