import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const authMiddleware = (
  request: Request<{
    userId?: string;
  }>,
  response: Response,
  next: NextFunction,
) => {
  const authHeader = request.headers.authorization;
  if (!authHeader) return response.status(401).json({ message: "No token" });

  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };

    request.userId = payload.id;

    next();
  } catch (err) {
    return response.status(401).json({
      message: "Invalid token",
      status: 401,
      data: null,
      error: {
        code: "InvalidToken",
        message: "Invalid token",
      },
    });
  }
};
