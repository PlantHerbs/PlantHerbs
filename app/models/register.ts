import { firestore } from "../../config";


export const addUser = async(data : any, image : string) : Promise<any> => {
    const { fullName , email, password  } = data as { fullName : string;email: string; password: string };
    const docRef = await firestore.collection('users').add({
              full_name: fullName,
              email,
              password,
              image
              // ...Tambahkan field lain sesuai kebutuhan
            });
    if(docRef){
        return true
    }
}