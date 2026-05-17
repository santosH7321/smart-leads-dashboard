import { Request, Response } from "express";
import { CatchError, TryError } from "../utils/error";
import User from "../models/user.model";

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