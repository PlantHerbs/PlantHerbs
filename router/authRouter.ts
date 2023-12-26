import express,{ Router } from "express";
import { Register, Login,} from "../app/controllers/authControllers";

//   const upload = multer({ storage: storage });

const authRouter: Router = express.Router();

authRouter.post("/register",Register)
authRouter.post("/login",Login)

// authRouter.post("/verify",verify)

export { authRouter };