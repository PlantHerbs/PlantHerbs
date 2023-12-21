"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const authControllers_1 = require("../app/controllers/authControllers");
// import { multer } from "../middleware/multer";
// import { ImgUpload } from "../lib/Bucket";
//   const upload = multer({ storage: storage });
const authRouter = express_1.default.Router();
exports.authRouter = authRouter;
authRouter.post("/register", authControllers_1.Register);
authRouter.post("/login", authControllers_1.Login);
authRouter.post("/verify", authControllers_1.verify);
