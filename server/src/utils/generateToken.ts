import jwt from "jsonwebtoken";

interface TokenPayload {
  userId: string;
  role?: string;
}

const generateToken = ( payload: TokenPayload, secret: string, expiresIn: string ) => {
  return jwt.sign(payload, secret, { expiresIn });
};

export const generateAccessToken = ( payload: TokenPayload ) => {
  if (!process.env.JWT_ACCESS_SECRET) {
    throw new Error("JWT_ACCESS_SECRET missing");
  }

  return generateToken( payload, process.env.JWT_ACCESS_SECRET, "15m" );
};

export const generateRefreshToken = ( payload: TokenPayload ) => {
  if (!process.env.JWT_REFRESH_SECRET) {
    throw new Error("JWT_REFRESH_SECRET missing");
  }

  return generateToken( payload, process.env.JWT_REFRESH_SECRET, "7d" );
};