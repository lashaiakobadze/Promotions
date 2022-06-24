const Promo = require("../models/promoModel");

exports.createPromo = (req, res, next) => {
  const promo = new Promo({
    promoId: req.body.promoId,
    consumerId: req.body.consumerId,
    promoType: req.body.promoType,
    promoCount: req.body.promoCount,
    currency: req.body.currency
  });

  promo
    .save()
    .then((createdPromo) => {
      res.status(201).json({
        message: "Promo added successfully",
        promo: {
          ...createdPromo,
          id: createdPromo._id
        }
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Creating a consumer failed!"
      });
    });
};

exports.getPromotions = (req, res, next) => {
  const promoQuery = Promo.find();
  let fetchedPromotions;

  promoQuery
    .then((documents) => {
      fetchedPromotions = documents;
      return Promo.count();
    })
    .then((count) => {
      res.status(200).json({
        message: "promotions fetched successfully!",
        promotions: fetchedPromotions,
        maxConsumers: count
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Fetching promotions failed!"
      });
    });
};

exports.getPromo = (req, res, next) => {
  Promo.findById(req.params.id)
    .then((promo) => {
      if (promo) {
        res.status(200).json(promo);
      } else {
        res.status(404).json({ message: "Promo not found!" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Fetching promo failed!"
      });
    });
};

exports.deletePromo = (req, res, next) => {
  Promo.deleteOne({ _id: req.params.id, creator: req.userData.userId })
    .then((result) => {
      if (result.deletedCount > 0) {
        res.status(200).json({ message: "Deletion successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Deleting promotions failed!"
      });
    });
};
