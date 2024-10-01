import { Router, Request, Response } from "express";

import auth from "@/modules/auth/controller";
import { authMiddleware } from "@/modules/auth/middleware";
import freightForwarding from "@/modules/freightForwarding/controller";
import { errorResponse } from "@/utils/response";

const router = Router();

router.use("/auth", auth);
router.use("/freight-forwarding", authMiddleware, freightForwarding);

// 404
router.use((req: Request, res: Response) => {
  return errorResponse(res, `${req.path} not found.`, null, 404);
});

export default router;
