import { Router } from "express";
import { Signup } from "../controllers/auth.controller";

export const AuthRouter = Router();

AuthRouter.post("/signup", Signup);