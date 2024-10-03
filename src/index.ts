import express from "express";
import dotenv from "dotenv";

import routes from "./router";
import appLogger from "./utils/logger";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(appLogger);

app.use("/", routes);

app.listen(port, () => {
  console.log(`[mode]: ${process.env.NODE_ENV}`);
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
