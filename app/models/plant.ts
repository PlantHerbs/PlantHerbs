import { firestore } from "../../config";

export const searchPlant = async(name : string) : Promise<any> => {
    const plantDoc = await firestore.collection('dataOutput').doc(name).get()
    if(!plantDoc.exists){
        return {
            status : false
        }
    }

    const plantData = plantDoc.data()
    return {
        status : true,
        data : plantData
    }
}