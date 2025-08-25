import { authController } from "./auth.controller";

import { Router } from "express";

export const authRouter = Router();

authRouter.post("/signup", authController.signup);

authRouter.post("/login", authController.login);
