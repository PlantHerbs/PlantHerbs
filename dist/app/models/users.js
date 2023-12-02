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
exports.addUser = void 0;
const config_1 = require("../../config");
const token_1 = require("./token");
const nodeMailer_1 = require("../../lib/nodeMailer");
const speakeasy_1 = __importDefault(require("speakeasy"));
const secret = speakeasy_1.default.generateSecret({ length: 20 });
const addUser = (data, image) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullName, email, password } = data;
    const docRef = yield config_1.firestore.collection('users').add({
        full_name: fullName,
        email,
        password,
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
