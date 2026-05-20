import { Router } from "express";
import { Login, RefreshToken, Signup } from "../controllers/auth.controller";

export const AuthRouter = Router();

AuthRouter.post("/signup", Signup);
AuthRouter.post("/login", Login);
AuthRouter.post("/refreshtoken", RefreshToken);