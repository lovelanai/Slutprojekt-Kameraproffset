import express, { NextFunction, Response, Request } from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { env } from "process";
import { userRouter } from "./user/user-router";
import { productRouter } from "./product/product-router";
import cookiesession from "cookie-session";
import { shipmentRouter } from "./shipment/shipment-router";
import { paymentRouter } from "./payment/payment-router";
import "colorts/lib/string";
import { orderRouter } from "./order/order-router";
import "colorts";
import { mediaRouter } from "./media/media-router";

require("dotenv").config();

const PORT = 4000;
const app = express();

// global middlewares
app.use(express.json());

// creating secure cookie
app.use(
  cookiesession({
    secret: "aVeryS3cr3tK3y",
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: false,
    secure: false,
  })
);

// routes
app.use("/api", userRouter);
app.use("/api", productRouter);
app.use("/api", shipmentRouter);
app.use("/api", paymentRouter);
app.use("/api", orderRouter);
app.use("/api", mediaRouter);

//Connect to mongoose
dotenv.config({ path: "/.env" });
mongoose
  .connect(`${process.env.DB_CONNECTION}`)
  .catch((error) => console.log(error));
console.log("connected to MongoDB".bgCyan);

//Server is running
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`.bgMagenta);
});

app.get("/", (req, res) => {
  res.send("server");
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const statusCode =
    res.statusCode < 400 || res.statusCode > 599 ? 500 : res.statusCode;

  console.error(err.stack);
  res.status(statusCode).json({ error: err.message });
});
