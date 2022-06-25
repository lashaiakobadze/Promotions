const express = require("express");

const PromoController = require("../controllers/promoController");

const router = express.Router();

router.post("", PromoController.createPromo);

// router.put("/:id", PromoController.updateConsumer);

router.get("", PromoController.getPromotions);

router.get("/:id", PromoController.getPromo);

// router.delete("/:id", checkAuth, PromoController.deletePromo);

module.exports = router;
