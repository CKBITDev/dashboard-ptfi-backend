import { Response } from "express";

export const successResponse = <T>(
  res: Response,
  message: String,
  data: T | null = null
) => {
  res.send({
    message,
    data,
  });
};

export const errorResponse = <T>(
  res: Response,
  message: String,
  data: T | null = null,
  statusCode: number = 400
) => {
  res.status(statusCode).send({
    message,
    data,
  });
};
