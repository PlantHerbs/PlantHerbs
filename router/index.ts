import express,{ Router } from "express";
export const router: Router = express.Router();

import {authRouter} from './authRouter'

router.use("/auth/v1/", authRouter)

export default router;
