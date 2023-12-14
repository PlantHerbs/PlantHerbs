import { firestore } from "../../config";
import { addToken } from "./token";
import { sendEmail } from "../../lib/nodeMailer";
import speakeasy, { GeneratedSecret } from 'speakeasy';
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';
const secret: GeneratedSecret = speakeasy.generateSecret({ length: 20 });

const algorithm = 'aes-256-cbc';
const key = randomBytes(32);
const iv = randomBytes(16); 


export const addUser = async(data : any, image : string) : Promise<any> => {
    const { fullName , email, password  } = data as { fullName : string;email: string; password: string };
    const cipher = createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(password, 'utf8', 'hex');
    encrypted += cipher.final('hex');

            const docRef = await firestore.collection('users').add({
              full_name: fullName,
              email,
              password: encrypted,
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

export const loginUser = async(data: any) : Promise<any> => {
    const decipher = createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(data.password_encrypt, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    console.log(decrypted)
    if(decrypted !== data.password_body){
      return false
    }

    return true

}

