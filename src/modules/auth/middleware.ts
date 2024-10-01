import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { User } from "@/models/user";
import { errorResponse } from "@/utils/response";
import { verifyAccessToken } from "./service";

type AuthenticatedRequest = Request & {
  user: User;
};

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null)
    return errorResponse(res, "Null authorization token.", null, 401);

  verifyAccessToken(token, (err: any, user: any) => {
    if (err) {
      return errorResponse(res, "Invalid authorization token", null, 403);
    }

    (req as AuthenticatedRequest).user = user;
    next();
  });
};

export const getUser = (req: Request): User => {
  const user = (req as AuthenticatedRequest).user;

  return {
    id: user.id,
  }
};
