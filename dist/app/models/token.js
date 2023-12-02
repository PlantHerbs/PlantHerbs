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
exports.addToken = void 0;
const config_1 = require("../../config");
const uuid_1 = require("uuid");
const tokenVerify = (0, uuid_1.v4)();
const addToken = (userId, token) => __awaiter(void 0, void 0, void 0, function* () {
    const date = Date.now() + 1000 * 60 * 60 * 24;
    const docRef = yield config_1.firestore.collection('tokens').add({
        userId,
        date,
        token
    });
    if (docRef) {
        return true;
    }
});
exports.addToken = addToken;
