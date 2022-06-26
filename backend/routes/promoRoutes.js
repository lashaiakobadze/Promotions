const express = require("express");

const checkAuth = require("../middleware/check-auth");
const PromoController = require("../controllers/promoController");

const router = express.Router();

router.get("", PromoController.getBasicPromotions);

router.post("", checkAuth, PromoController.createPromo);

router.put("", checkAuth, PromoController.updatePromo);

router.post("/consumer", checkAuth, PromoController.fetchConsumerPromotions);

router.delete("", checkAuth, PromoController.deletePromo);

module.exports = router;
