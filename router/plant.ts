import express,{ Router } from "express";
const plantRouter: Router = express.Router();
import { GetPlants } from "../app/controllers/plantControllers";


plantRouter.get("/:name", GetPlants)

export { plantRouter}