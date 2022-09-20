import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";

import upload from "@config/upload";

import swaggerFile from "../../../swagger.json";
import { AppError } from "../../errors/AppError";
import createConnection from "../typeorm";
import { rateLimiter } from "./middlewares/rateLimiter";
import { router } from "./routes";

import "../../container";

createConnection();
const app = express();
app.use(rateLimiter);

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));
app.use(cors());
app.use(router);
app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        message: error.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal Server Error: ${error.message}`,
    });
  }
);

export { app };
