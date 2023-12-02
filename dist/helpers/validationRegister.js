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
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationRegister = void 0;
const config_1 = require("../config");
function validationRegister(data) {
    return __awaiter(this, void 0, void 0, function* () {
        // Memeriksa validitas email menggunakan regular expression sederhana
        const userEmail = data.email;
        if (!data.fullName || !data.email || !data.password || !userEmail) {
            return 'data kosong';
        }
        const snapshot = yield config_1.firestore.collection('users')
            .where('email', '==', userEmail)
            .get();
        // console.log(snapshot.docs[0].data())
        if (!snapshot.empty) {
            return 'Email sudah terdaftar';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (typeof data.email !== 'string' || !emailRegex.test(data.email)) {
            return 'Email tidak valid';
        }
        if (typeof data.password !== 'string' || data.password.length < 6) {
            return 'Password harus berupa string dengan panjang minimal 6 karakter';
        }
        return true;
    });
}
exports.validationRegister = validationRegister;
