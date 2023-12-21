import express,{ Router } from "express";
export const router: Router = express.Router();

import {authRouter} from './authRouter'
import { plantRouter } from "./plant";

router.use("/auth/v1/", authRouter)
router.use("/plant/v1/", plantRouter)

export default router;
