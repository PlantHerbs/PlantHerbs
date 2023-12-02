import { firestore } from "../../config";
import { addToken } from "./token";


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
    const addTokens = await addToken(docRef.id)
    if(docRef && addTokens){
        return true
    }
}