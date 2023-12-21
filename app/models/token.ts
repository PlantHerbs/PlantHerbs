import { firestore } from "../../config";


import { v4 as uuidv4 } from 'uuid';
const tokenVerify : string = uuidv4()


export const addToken = async(userId : string, token: string) : Promise<any> => {
    const date = new Date()
    const docRef = await firestore.collection('tokens').add({
              userId,
              date,
              token
            });
    if(docRef){
        return true
    }
}

export const getToken = async(otp : Number) : Promise<any> => {
    // const date = Date.now() + 1000 * 60 * 60 * 24
    console.log(otp)
    const docRef = await firestore.collection('tokens').where('token', '==' ,otp).get()  
    const dateCreated = docRef.docs[0].data().date
    const expirationDate = new Date(dateCreated.getTime() + 5 * 60 * 1000)
    if(dateCreated > expirationDate){
        return false
    }

    return {
        status : true,
        data : docRef.docs[0].data()
    }
    // console.log(docRef.docs)
    // if(docRef){
    //     return true
    // }
}