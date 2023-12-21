"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
exports.router = express_1.default.Router();
const authRouter_1 = require("./authRouter");
const plant_1 = require("./plant");
exports.router.use("/auth/v1/", authRouter_1.authRouter);
exports.router.use("/plant/v1/", plant_1.plantRouter);
exports.default = exports.router;
