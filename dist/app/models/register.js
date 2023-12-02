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
exports.addUser = void 0;
const config_1 = require("../../config");
const addUser = (data, image) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullName, email, password } = data;
    const docRef = yield config_1.firestore.collection('users').add({
        full_name: fullName,
        email,
        password,
        image
        // ...Tambahkan field lain sesuai kebutuhan
    });
    if (docRef) {
        return true;
    }
});
exports.addUser = addUser;
