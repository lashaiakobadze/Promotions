const express = require("express");

const ConsumerController = require("../controllers/consumerController");

const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");

const router = express.Router();

router.post(
  "",
  checkAuth,
  ConsumerController.uploadUserPhoto,
  ConsumerController.resizeUser,
  ConsumerController.createConsumer
);

router.put(
  "/:id",
  checkAuth,
  ConsumerController.uploadUserPhoto,
  ConsumerController.resizeUser,
  ConsumerController.updateConsumer
);

router.get("", ConsumerController.getConsumers);

router.get("/:id", ConsumerController.getConsumer);

router.delete("/:id", checkAuth, ConsumerController.deleteConsumer);

module.exports = router;
