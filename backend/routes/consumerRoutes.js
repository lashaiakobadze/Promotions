import express from "express";
import { checkAuth } from "../middleware/check-auth";
import * as ConsumerController from "../controllers/consumerController";

export const consumerRouter = express.Router();

consumerRouter.post(
  "",
  checkAuth,
  ConsumerController.uploadUserPhoto,
  ConsumerController.resizeUser,
  ConsumerController.createConsumer
);

consumerRouter.put(
  "/:id",
  checkAuth,
  ConsumerController.uploadUserPhoto,
  ConsumerController.resizeUser,
  ConsumerController.updateConsumer
);

consumerRouter.get("", ConsumerController.getConsumers);

consumerRouter.get("/:id", ConsumerController.getConsumer);

consumerRouter.delete("/:id", checkAuth, ConsumerController.deleteConsumer);
