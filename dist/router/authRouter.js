"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const authControllers_1 = require("../app/controllers/authControllers");
const multer_1 = require("../middleware/multer");
const Bucket_1 = require("../lib/Bucket");
//   const upload = multer({ storage: storage });
const authRouter = express_1.default.Router();
exports.authRouter = authRouter;
authRouter.post("/register", multer_1.multer.single('attachment'), Bucket_1.ImgUpload.uploadToGcs, authControllers_1.Register);
authRouter.post("/login", authControllers_1.Login);
