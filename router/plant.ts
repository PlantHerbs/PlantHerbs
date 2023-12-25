import express,{ Router } from "express";
const plantRouter: Router = express.Router();
import { GetPlants , GetAllPlant} from "../app/controllers/plantControllers";


plantRouter.get("/:name", GetPlants)
plantRouter.get("/", GetAllPlant)

export { plantRouter}