import { Request, Response } from "express";
import { CatchError, TryError } from "../utils/error";
import User from "../models/user.model";
import bcrypt from "bcryptjs";

export const Signup = async (req: Request, res: Response) => {
    try {
        const { name, email, password, role } = req.body;

        if(!name || !email || !password)
        {
            return res.status(400).json({message: "Name, email and password are required"})
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            throw TryError("Email already exists", 400);
        }

        const user = await User.create({ name, email, password, role });

        const hidePassword = await User.findById(user._id).select("-password");

        res.status(201).json({ message: "User created successfully", user: hidePassword });
    }
    catch(error: unknown) {
        CatchError(error, res, "Signup failed please try after sometime")
    }
}

export const Login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if(!email || !password)
        {
            return res.status(400).json({message: "Email and password are required"})
        }

        const user = await User.findOne({ email });

        if (!user) {
            throw TryError("Invalid email or password", 400);
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw TryError("Invalid email or password", 400);
        }

        const hidePassword = await User.findById(user._id).select("-password");

        res.status(200).json({ message: "Login successful", user: hidePassword });
    }
    catch(error: unknown) {
        CatchError(error, res, "Login failed please try after sometime")
    }
}