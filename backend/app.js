import express from "express";
import config from "./src/config/serverConfig.js";
import cookieParser from "cookie-parser";
import cors from "cors";
// import { sendMail } from "./src/controllers/sendMail.js";
import path from "path";
import logger from "morgan";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(
  cors({
    origin: config.ORIGIN,
    credentials: true,
  })
);
app.use(logger("dev"));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

// routes

import userRouter from "./src/routes/v1/user.routes.js";

// user routes
app.use("/api/v1/users", userRouter);

// admin routes
// app.use("/api/v1/admin", adminRouter);

app.listen(config.PORT, () => {
  console.log(`Server is listening on port: ${config.PORT}`);
});
