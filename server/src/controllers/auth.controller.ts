import { Request, Response } from "express";
import { CatchError, TryError } from "../utils/error";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken } from "../utils/generateToken";
import jwt from "jsonwebtoken";

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

        const accessToken = generateAccessToken({
            userId: user._id.toString(),
            role: user.role,
        });

        const refreshToken = generateRefreshToken({
            userId: user._id.toString(),
            role: user.role,
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        const hidePassword = await User.findById(user._id).select("-password");

        res.status(201).json({
            success: true,
            message: "User created successfully",
            accessToken,
            user: hidePassword,
        });
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

        const accessToken = generateAccessToken({
            userId: user._id.toString(),
            role: user.role,
        });

        const refreshToken = generateRefreshToken({
            userId: user._id.toString(),
            role: user.role,
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });


        const hidePassword = await User.findById(user._id).select("-password");

        res.status(200).json({
            success: true,
            message: "Login successful",
            accessToken,
            user: hidePassword,
        });
    }
    catch(error: unknown) {
        CatchError(error, res, "Login failed please try after sometime")
    }
}

export const RefreshToken = async ( req: Request, res: Response ) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        message: "Refresh token missing",
      });
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET!
    ) as {
      userId: string;
      role: string;
    };

    const accessToken = generateAccessToken({
      userId: decoded.userId,
      role: decoded.role,
    });

    res.status(200).json({
      success: true,
      accessToken,
    });
  } catch (error) {
    res.status(401).json({
      message: "Invalid refresh token",
    });
  }
};