import { firestore } from "../../config";


import { v4 as uuidv4 } from 'uuid';
const tokenVerify : string = uuidv4()


export const addToken = async(userId : string, token: string) : Promise<any> => {
    const date = Date.now() + 1000 * 60 * 60 * 24
    const docRef = await firestore.collection('tokens').add({
              userId,
              date,
              token
            });
    if(docRef){
        return true
    }
}