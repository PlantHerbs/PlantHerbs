import express,{ Router } from "express";
import { Register, Login} from "../app/controllers/authControllers";
// import { multer } from "../middleware/multer";
// import { ImgUpload } from "../lib/Bucket";




  
//   const upload = multer({ storage: storage });

const authRouter: Router = express.Router();

authRouter.post("/register",Register)
authRouter.post("/login",Login)
// authRouter.post("/verify",verify)

export { authRouter };