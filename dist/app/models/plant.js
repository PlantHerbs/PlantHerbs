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
exports.GetAllPlants = exports.searchPlant = void 0;
const config_1 = require("../../config");
const searchPlant = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const plantDoc = yield config_1.firestore.collection('dataOutput').doc(name).get();
    if (!plantDoc.exists) {
        return {
            status: false
        };
    }
    const plantData = plantDoc.data();
    return {
        status: true,
        data: plantData
    };
});
exports.searchPlant = searchPlant;
const GetAllPlants = () => __awaiter(void 0, void 0, void 0, function* () {
    const plantDoc = yield (yield config_1.firestore.collection('dataOutput').get()).docs;
    const datas = [];
    if (!plantDoc) {
        return {
            status: false
        };
    }
    plantDoc.forEach((doc) => datas.push(doc.data()));
    // if(plantDoc.empty){
    //     return {
    //         status : false
    //     }
    // }
    // const plantData = plantDoc.
    return {
        status: true,
        data: datas
    };
});
exports.GetAllPlants = GetAllPlants;
