const express = require("express");

const PromoController = require("../controllers/promoController");

const router = express.Router();

router.post("", PromoController.createPromo);

router.get("", PromoController.getPromotions);

router.get("/:id", PromoController.fetchConsumerPromotions);

// router.delete("/:id", checkAuth, PromoController.deletePromo);

module.exports = router;
