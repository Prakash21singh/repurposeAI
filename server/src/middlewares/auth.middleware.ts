import { NextFunction, Request, Response } from "express";
import { ResponseUtil } from "../utils";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;
    console.log("Request cacme");

    if (!authHeader) {
      res.status(401).json({ message: "Authorization header missing" });
      return; // Early return without calling next()
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "Token missing" });
      return; // Early return without calling next()
    }

    // Use type assertion or declare module augmentation elsewhere
    (req as any).userId = token;

    next();
  } catch (error: any) {
    res.json(ResponseUtil.error("Access Denied", 400));
    return; // Make sure we return after sending response
  }
}
