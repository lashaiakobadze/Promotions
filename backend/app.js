import path from "path";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import { userRouter } from "./routes/user";
import { consumerRouter } from "./routes/consumerRoutes";
import { promoRouter } from "./routes/promoRoutes";

const app = express();

const DB = process.env.DATABASE_LOCAL;

/**
 * connect local cluster for easy use everyone.
 */
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    keepAlive: true
  })
  .then(() => {
    console.log("DB connection successful!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/user", userRouter);
app.use("/api/consumers", consumerRouter);
app.use("/api/promotions", promoRouter);

export default app;
