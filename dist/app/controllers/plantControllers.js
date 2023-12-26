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
exports.predictPlant = exports.GetAllPlant = exports.GetPlants = void 0;
const plant_1 = require("../models/plant");
const axios_1 = __importDefault(require("axios"));
const GetPlants = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.params.name;
        const plantData = yield (0, plant_1.searchPlant)(name);
        if (!plantData.status) {
            return res.status(404).json({
                status: 'Not Found',
                error: 'Data Tanaman Not Found'
            });
        }
        return res.status(200).json({
            status: 'Ok',
            message: 'Data Plant Found',
            data: plantData.data
        });
    }
    catch (err) {
        res.status(err.statusCode || 500).json({
            status: "failed",
            message: err.message,
        });
    }
});
exports.GetPlants = GetPlants;
const GetAllPlant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const plantData = yield (0, plant_1.GetAllPlants)();
        if (!plantData.status) {
            return res.status(404).json({
                status: 'Not Found',
                error: 'Data Tanaman Not Found'
            });
        }
        return res.status(200).json({
            status: 'Ok',
            message: 'Data Plant Found',
            data: plantData.data
        });
    }
    catch (err) {
        res.status(err.statusCode || 500).json({
            status: "failed",
            message: err.message,
        });
    }
});
exports.GetAllPlant = GetAllPlant;
const predictPlant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let imageName = '';
        if (req.file && req.file.cloudStorageObject) {
            imageName = req.file.cloudStorageObject;
        }
        const requestBody = {
            filename: `${imageName}`
        };
        const response = yield axios_1.default.post(`${process.env.LINK_PREDICT_API}`, requestBody, {
            headers: {
                'Content-Type': 'application/json', // Atur tipe konten yang sesuai
                // Jika diperlukan, tambahkan header lain di sini
            },
        });
        // const getPredict = await axios.post(`${process.env.LINK_PREDICT_API}?filename=${filename}`);
        const predictPlant = response.data;
        res.status(200).jsonp(predictPlant);
    }
    catch (err) {
        res.status(err.statusCode || 500).json({
            status: "failed",
            message: err.message,
        });
    }
});
exports.predictPlant = predictPlant;
