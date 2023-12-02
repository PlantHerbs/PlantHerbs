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
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log(process.env.EMAIL, process.env.PASS_APPS);
// Konfigurasi transporter
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL, // Ganti dengan email pengirim
        pass: process.env.PASS_APPS, // Ganti dengan password email pengirim
    }
});
// Fungsi untuk mengirim email
const sendEmail = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Pengaturan email yang akan dikirim
        const mailOptions = {
            from: "'Test Send Email' <no-reply@gmail.com>", // Alamat email pengirim
            to: data.EMAIL, // Alamat email penerima
            subject: 'Test Send Email',
            html: data.html
        };
        // Mengirim email
        const info = yield transporter.sendMail(mailOptions);
        console.log('Email terkirim: ', info.messageId);
    }
    catch (error) {
        console.error('Terjadi kesalahan saat mengirim email:', error);
    }
});
exports.sendEmail = sendEmail;
// Panggil fungsi sendEmail untuk mengirim email
// sendEmail();
