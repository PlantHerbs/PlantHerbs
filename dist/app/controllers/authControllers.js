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
exports.Login = exports.Register = void 0;
const users_1 = require("../models/users");
const validationUser_1 = require("../../helpers/validationUser");
// import { sendEmail } from "../../lib/nodeMailer";
const Register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log(imageUrl)
        const validateRegister = yield (0, validationUser_1.validationRegister)(req.body);
        if (typeof validateRegister === 'string') {
            return res.status(400).json({
                status: "Failed",
                message: validateRegister,
            });
        }
        const newUser = yield (0, users_1.addUser)(req.body);
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
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.body.email == "" || req.body.password == "") {
            return res.status(400).json({
                status: "Bad Request",
                Error: "Sorry Email & Password Is Required ",
            });
        }
        const GettingData = yield (0, validationUser_1.GetData)(req.body.email);
        // console.log(GettingData)
        if (GettingData.docs[0].data().verified == false) {
            return res.status(401).json({
                status: "Unauthorized",
                Error: "Sorry this account not verify",
            });
        }
        const password = {
            password_encrypt: GettingData.docs[0].data().password,
            password_body: req.body.password
        };
        const login = yield (0, users_1.loginUser)(password);
        if (!login) {
            return res.status(400).json({
                status: "Failed",
                error: "Invalid Password",
            });
        }
        return res.status(200).json({
            status: "Success",
            message: "Login Success",
        });
    }
    catch (err) {
        res.status(err.statusCode || 500).json({
            status: "failed",
            message: err.message,
        });
    }
});
exports.Login = Login;
// export const verify = async(req : Request  ,res : Response) : Promise<any> => {
//     try{
//        const { otp } =  req.body
//     //    console.log()
//         const validateToken = await getToken(otp.toString())
//         if(!validateToken){
//             res.status(401).json({
//                 status: 'Unauthorized',
//                 error: 'your otp is expired'
//             })
//         }
//         const changeStatus = await updateStatus(validateToken.data)
//         if(!changeStatus){
//             res.status(401).json({
//                 status: 'Unauthorized',
//                 error: 'user undefined'
//             })
//         }
//         res.status(200).json({
//             status: "Ok",
//             message: "Update Status Success",
//           });
//     }catch(err : any){
//         res.status(err.statusCode || 500).json({
//             status: "failed",
//             message: err.message,
//           });
//     }
// }
