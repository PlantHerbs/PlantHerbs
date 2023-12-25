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

export const GetAllPlants = async() : Promise<any> => {
    const plantDoc = await (await firestore.collection('dataOutput').get()).docs
    const datas : any = []
    if(!plantDoc){
        return {
            status : false
            }
    }
    plantDoc.forEach((doc) => datas.push(doc.data())) 


    // if(plantDoc.empty){
    //     return {
    //         status : false
    //     }
    // }

    

    // const plantData = plantDoc.
    return {
        status : true,
        data : datas
    }
}