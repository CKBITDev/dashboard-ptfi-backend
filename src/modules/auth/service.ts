import jwt from "jsonwebtoken";

import { User } from "@/models/user";

export const generateAccessToken = (user: User) => {
  if (process.env.JWT_SECRET === undefined) {
    throw new Error('Blank env "JWT_SECRET".');
  } else {
    return jwt.sign(user, process.env.JWT_SECRET);
  }

};

export const verifyAccessToken = (
  token: string,
  callback: (err: any, user: any) => void
) => {
  if (process.env.JWT_SECRET === undefined) {
    throw new Error('Blank env "JWT_TOKEN".');
  } else {
    jwt.verify(token, process.env.JWT_SECRET, callback);
  }

};
