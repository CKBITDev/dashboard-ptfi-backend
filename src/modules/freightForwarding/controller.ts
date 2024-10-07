import dayjs from "dayjs";
import { Request, Response, Router } from "express";
import { matchedData, query, validationResult } from "express-validator";

import { errorResponse, successResponse } from "@/utils/response";
import { getDocumentData } from "./service";

const router = Router();

router.get(
  "/documents",
  query("type")
    .isIn(["spbb", "work-order"])
    .withMessage("One of [spbb, work-order]"),
  query("date_start").isDate().withMessage("Is invalid date"),
  query("date_end").isDate().withMessage("Is invalid date"),
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return errorResponse(res, "validation error", errors.array());
      }
      const data = matchedData(req);

      const result = await getDocumentData(
        data.type,
        data.date_start,
        data.date_end
      );

      const start = dayjs(data.date_start).startOf("day");
      const end = dayjs(data.date_end).endOf("day");
      const output = [];
      for (let day = dayjs(start); day.isBefore(end); day = day.add(1, "day")) {
        const dataOfDay = result.find((d) =>
          day.isSame(d.distinct_date, "day")
        );
        output.push({
          date: day.format("YYYY-MM-DD"),
          outstanding: dataOfDay?.outstanding ?? 0,
          completed: dataOfDay?.completed ?? 0,
        });
      }

      successResponse(res, "success get documents", output);
    } catch (err: any) {
      console.error(err);
      errorResponse(res, "Error", err.message);
    }
  }
);

export default router;
