import { Request, Response } from "express"
import { searchPlant } from "../models/plant";
import { error } from "console";

export const GetPlants = async(req : Request  ,res : Response) : Promise<any> => {
    try{
        const name = req.params.name
        const plantData = await searchPlant(name)

        if (!plantData.status){
            return res.status(404).json({
                status : 'Not Found',
                error : 'Data Tanaman Not Found'
            })
        }

        return res.status(200).json({
            status : 'Ok',
            message : 'Data Plant Found',
            data : plantData.data
        })

    }catch(err : any){
        res.status(err.statusCode || 500).json({
            status: "failed",
            message: err.message,
          });
    }
}