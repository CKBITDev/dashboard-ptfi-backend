import { Request, Response } from "express";
import { body, matchedData, validationResult } from "express-validator";
import { Router } from "express";

import { errorResponse, successResponse } from "@/utils/response";
import { generateAccessToken } from "./service";

const router = Router();

router.post(
  "/login",
  body("user_id").notEmpty(),
  body("password").notEmpty(),
  (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return errorResponse(res, "validation error", errors.array());
      }
      const data = matchedData(req);

      const token = generateAccessToken({
        id: data.user_id,
      });
      return successResponse(res, "login", {
        token,
      });
    } catch (err: any) {
      console.error(err);
      return errorResponse(res, "Error", err.message);
    }
  }
);

export default router;
