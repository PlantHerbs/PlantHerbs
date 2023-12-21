"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.plantRouter = void 0;
const express_1 = __importDefault(require("express"));
const plantRouter = express_1.default.Router();
exports.plantRouter = plantRouter;
const plantControllers_1 = require("../app/controllers/plantControllers");
plantRouter.get("/:name", plantControllers_1.GetPlants);
