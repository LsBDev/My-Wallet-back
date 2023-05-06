import { Router } from "express";
import { signUp, signIn, signOut} from "../controllers/auth.controller.js";
import validateSchema from "../middlewares/validateSchema.js";
import { loginSchema, userSchema } from "../schemas/auth.schemas.js";
import { authValidation } from "../middlewares/authValidation.middleware.js";


const authRouter = Router();
authRouter.post("/signUp", validateSchema(userSchema), signUp);
authRouter.post("/signIn", validateSchema(loginSchema), signIn);
authRouter.post("/signOut", authValidation, signOut);

export default authRouter;