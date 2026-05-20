import { Router } from "express";
import { Login, Logout, RefreshToken, Signup } from "../controllers/auth.controller";

export const AuthRouter = Router();

AuthRouter.post("/signup", Signup);
AuthRouter.post("/login", Login);
AuthRouter.post("/refreshtoken", RefreshToken);
AuthRouter.post("/logout", Logout);