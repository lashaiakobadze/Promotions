import express from "express";
import { checkAuth } from "../middleware/check-auth";
import { uploadUserPhoto } from "../middleware/file";
import * as ConsumerController from "../controllers/consumerController";

export const consumerRouter = express.Router();

consumerRouter
  .route("/")
  .get(ConsumerController.getConsumers)
  .post(
    checkAuth,
    uploadUserPhoto,
    ConsumerController.resizeConsumerFile,
    ConsumerController.createConsumer
  );

consumerRouter
  .route("/:id")
  .get(ConsumerController.getConsumer)
  .put(
    checkAuth,
    uploadUserPhoto,
    ConsumerController.resizeConsumerFile,
    ConsumerController.updateConsumer
  )
  .delete(checkAuth, ConsumerController.deleteConsumer);
