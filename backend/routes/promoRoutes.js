import express from "express";
import { checkAuth } from "../middleware/check-auth";
import * as PromoController from "../controllers/promoController";

export const promoRouter = express.Router();
promoRouter
  .route("/")
  .get(PromoController.getBasicPromotions)
  .post(checkAuth, PromoController.createPromo)
  .put(checkAuth, PromoController.updatePromo)
  .delete(checkAuth, PromoController.deletePromo);

promoRouter
  .route("/consumer")
  .post(checkAuth, PromoController.fetchConsumerPromotions);
