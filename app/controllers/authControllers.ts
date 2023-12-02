import { Request, Response } from "express"
import { addUser } from "../models/users";
import { validationRegister } from "../../helpers/validationRegister";
// import { sendEmail } from "../../lib/nodeMailer";

interface MulterFile {
    cloudStoragePublicUrl?: string;
    // Tambahkan properti lain yang dibutuhkan dari objek file jika ada
}

export const Register = async(req : Request  & { file?: MulterFile },res : Response) : Promise<any> => {
    try{
        var imageUrl = ''
        if (req.file && req.file.cloudStoragePublicUrl) {
            imageUrl = req.file.cloudStoragePublicUrl
        }
        console.log(imageUrl)
        const validateRegister = await validationRegister(req.body)
        if (typeof validateRegister === 'string') {
            return res.status(400).json({
                status: "Failed",
                message: validateRegister,
            });
        }

        
        
      
        const newUser = await addUser(req.body, imageUrl)
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