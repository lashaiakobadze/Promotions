import express from "express";
import { checkAuth } from "../middleware/check-auth";
import * as PromoController from "../controllers/promoController";

export const promoRouter = express.Router();

promoRouter.get("", PromoController.getBasicPromotions);

promoRouter.post("", checkAuth, PromoController.createPromo);

promoRouter.put("", checkAuth, PromoController.updatePromo);

promoRouter.post(
  "/consumer",
  checkAuth,
  PromoController.fetchConsumerPromotions
);

promoRouter.delete("", checkAuth, PromoController.deletePromo);
