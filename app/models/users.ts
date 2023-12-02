import { firestore } from "../../config";
import { addToken } from "./token";
import { sendEmail } from "../../lib/nodeMailer";
import speakeasy, { GeneratedSecret } from 'speakeasy';
const secret: GeneratedSecret = speakeasy.generateSecret({ length: 20 });

export const addUser = async(data : any, image : string) : Promise<any> => {
    const { fullName , email, password  } = data as { fullName : string;email: string; password: string };
    const docRef = await firestore.collection('users').add({
              full_name: fullName,
              email,
              password,
              image,
              verified: false   
              // ...Tambahkan field lain sesuai kebutuhan
            });
            const token: string = speakeasy.totp({
                secret: secret.ascii || 'RAHASIA',
                encoding: 'ascii',
                digits: 6, // Number of digits in the OTP
              });
            const datas = {
                EMAIL: email,
                subject: "Email Verification",
                // text: "hello word",
                // html : htmlToSend,
                html: `<p>ini kode otp mu : ${token}</p>`, // eslint-disable-line
              }
              await sendEmail(datas)
    const addTokens = await addToken(docRef.id, token)
    if(docRef && addTokens){
        return true
    }
}