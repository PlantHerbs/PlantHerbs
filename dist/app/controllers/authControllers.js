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
exports.Register = void 0;
const users_1 = require("../models/users");
const validationRegister_1 = require("../../helpers/validationRegister");
const Register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var imageUrl = '';
        if (req.file && req.file.cloudStoragePublicUrl) {
            imageUrl = req.file.cloudStoragePublicUrl;
        }
        console.log(imageUrl);
        const validateRegister = yield (0, validationRegister_1.validationRegister)(req.body);
        if (typeof validateRegister === 'string') {
            return res.status(400).json({
                status: "Failed",
                message: validateRegister,
            });
        }
        const newUser = yield (0, users_1.addUser)(req.body, imageUrl);
        if (newUser) {
            res.status(201).json({
                status: "Created",
                message: "Registrasi berhasil",
            });
        }
    }
    catch (err) {
        res.status(err.statusCode || 500).json({
            status: "failed",
            message: err.message,
        });
    }
});
exports.Register = Register;
