import { Request, Response } from "express"
import { addUser, loginUser , updateStatus} from "../models/users";
import { validationRegister, GetData } from "../../helpers/validationUser";
import { getToken } from "../models/token";
import { log } from "console";
// import { sendEmail } from "../../lib/nodeMailer";

// interface MulterFile {
//     cloudStoragePublicUrl?: string;
//     // Tambahkan properti lain yang dibutuhkan dari objek file jika ada
// }

export const Register = async(req : Request  ,res : Response) : Promise<any> => {
    try{
        
        // console.log(imageUrl)
        const validateRegister = await validationRegister(req.body)
        if (typeof validateRegister === 'string') {
            return res.status(400).json({
                status: "Failed",
                message: validateRegister,
            });
        }
      
        const newUser = await addUser(req.body)
        if(newUser){
            res.status(201).json({
                status: "Created",
                message: "Registrasi berhasil",
              });
        }

        
    }catch(err : any){
        res.status(err.statusCode || 500).json({
            status: "failed",
            message: err.message,
          });
    }
    

}


export const Login = async(req : Request  ,res : Response) : Promise<any> => {
    try{
        
        if(req.body.email == "" || req.body.password == ""){
            return res.status(400).json({
                status: "Bad Request",
                Error: "Sorry Email & Password Is Required ",
            });
        }
        const GettingData = await GetData(req.body.email)

        // console.log(GettingData)
        if(GettingData.docs[0].data().verified == false){
            return res.status(401).json({
                status: "Unauthorized",
                Error: "Sorry this account not verify",
            });
        }

        const password = {
            password_encrypt :  GettingData.docs[0].data().password,
            password_body : req.body.password
        }
        const login = await loginUser(password)
        if(!login){
            return res.status(400).json({
                status: "Failed",
                error: "Invalid Password",
            });
        }

        return res.status(200).json({
            status: "Success",
            message: "Login Success",
        });
       
    }catch(err : any){
        res.status(err.statusCode || 500).json({
            status: "failed",
            message: err.message,
          });
    }
    
}

// export const updateUser = async(req : Request & { file?: MulterFile } ,res : Response) : Promise<any> => {
//     try{
//         let imageUrl = ''
//         if (req.file && req.file.cloudStoragePublicUrl) {
//             imageUrl = req.file.cloudStoragePublicUrl
//         }
    
//     }catch(err : any){
//         res.status(err.statusCode || 500).json({
//             status: "failed",
//             message: err.message,
//           });
//     }
    
// }

export const verify = async(req : Request  ,res : Response) : Promise<any> => {
    try{
        
       const { otp } =  req.body
    //    console.log()
        const validateToken = await getToken(otp.toString())
        if(!validateToken){
            res.status(401).json({
                status: 'Unauthorized',
                error: 'your otp is expired'
            })
        }

        const changeStatus = await updateStatus(validateToken.data)
        if(!changeStatus){
            res.status(401).json({
                status: 'Unauthorized',
                error: 'user undefined'
            })
        }

        res.status(200).json({
            status: "Ok",
            message: "Update Status Success",
          });
       
    }catch(err : any){
        res.status(err.statusCode || 500).json({
            status: "failed",
            message: err.message,
          });
    }
    

}