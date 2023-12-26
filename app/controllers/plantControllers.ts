import { Request, Response } from "express"
import { searchPlant, GetAllPlants } from "../models/plant";
import { error } from "console";
import axios, { AxiosResponse } from 'axios';

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
        res.status(err.statusCode || 404).json({
            status: "failed",
            message: 'Undetectable',
          });
    }
}


export const GetAllPlant = async(req : Request  ,res : Response) : Promise<any> => {
    try{
        const plantData = await GetAllPlants()

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

interface MulterFile {
    cloudStorageObject?: string;
    // Tambahkan properti lain yang dibutuhkan dari objek file jika ada
}

export const predictPlant = async(req : Request & { file?: MulterFile } ,res : Response) : Promise<any> => {
    try{
        let imageName = ''
        if (req.file && req.file.cloudStorageObject) {
            imageName = req.file.cloudStorageObject
        }

        const requestBody = {
          filename: `${imageName}`
      }
        const response : AxiosResponse = await axios.post(`${process.env.LINK_PREDICT_API}`, requestBody, {
            headers: {
              'Content-Type': 'application/json', // Atur tipe konten yang sesuai
              // Jika diperlukan, tambahkan header lain di sini
            },
          });
        // const getPredict = await axios.post(`${process.env.LINK_PREDICT_API}?filename=${filename}`);
        const predictPlant = response.data;
        
        res.status(200).jsonp(predictPlant)
    
    }catch(err : any){
        res.status(err.statusCode || 500).json({
            status: "failed",
            message: err.message,
          });
    }
    
}