import { Request, Response, Router } from "express";
import { body, matchedData, validationResult } from "express-validator";

import { errorResponse, successResponse } from "@/utils/response";
import { getUser } from "@/modules/auth/middleware";
import { getDocumentData } from "./service";

const router = Router();

router.get(
  "/documents",
  body("type")
    .isIn(["spbb", "work-order"])
    .withMessage("One of [spbb, work-order]"),
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return errorResponse(res, "validation error", errors.array());
      }
      const data = matchedData(req);

      const result = await getDocumentData(data.type);
      successResponse(res, "success get documents", result);
    } catch (err: any) {
      console.error(err);
      errorResponse(res, "Error", err.message);
    }
  }
);

export default router;
