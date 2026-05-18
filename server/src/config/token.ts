import jwt from "jsonwebtoken";

export const accessToken = (userId: string) => {
    try {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: "15m" });
        return token;
    } catch (error) {
        throw new Error("Error generating access token");
    }
}

export const refreshToken = (userId: string) => {
    try {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: "7d" });
        return token;
    } catch (error) {
        throw new Error("Error generating refresh token");
    }
}