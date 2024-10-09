import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import routes from "./router";
import appLogger from "./utils/logger";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(";"),
    allowedHeaders: [
      "Content-Type",
      "Accept",
      "Authorization",
      "X-Requested-With",
    ],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(appLogger);

app.use("/", routes);

app.listen(port, () => {
  console.log(`[server] mode = ${process.env.NODE_ENV}`);
  console.log(`[server] Server is running at http://localhost:${port}`);
});
