/**
 * Required External Modules
 */
import * as dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import indexRouter from "./router/index";

dotenv.config();

/**
 * App Variables
 */
const PORT: number = parseInt((process.env.PORT as string) || "3000", 10);

const app = express();
/**
 *  App Configuration
 */
app.use(helmet());
app.use(cors());
app.use(express.json());
/**
 * Server Activation
 */
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
/**
 * MongoBD connection
 */
mongoose
  .connect(
    "mongodb+srv://hanminhhoa1997:Hanhoa1997@hanhoa.xtppyqs.mongodb.net/management",
  )
  .then(() => {
    console.log("Connect database MongoDB success");
  });

app.use("/", indexRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  const err = new Error("Not Found");
  next(err);
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(404).send(err.message);
  next;
});
