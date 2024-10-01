import { Request, Response, Router } from "express";

import { errorResponse, successResponse } from "@/utils/response";
import { getUser } from "../auth/middleware";

const router = Router();

router.get("/documents", (req: Request, res: Response) => {
  try {
    const user = getUser(req)
    successResponse(res, "TODO get documents", { user });
  } catch (err: any) {
    console.error(err);
    errorResponse(res, "Error", err.message);
  }
});

export default router;
