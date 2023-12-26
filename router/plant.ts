import express,{ Router } from "express";
const plantRouter: Router = express.Router();
import { GetPlants , GetAllPlant , predictPlant} from "../app/controllers/plantControllers";
import { multer } from "../middleware/multer";
import { ImgUpload } from "../lib/Bucket";


plantRouter.get("/:name", GetPlants)
plantRouter.get("/", GetAllPlant)
plantRouter.post("/predict", multer.single('file'), ImgUpload.uploadToGcs, predictPlant)

export { plantRouter}