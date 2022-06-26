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
  /**
   * @basicPromotions is such basic, added from admin, with business logic.
   */
  let basicPromotions;
  /**
   * @consumerPromotions is really consumer's promotions.
   */
  let consumerPromotions;

  promoQuery
    .then((documents) => {
      fetchedPromotions = documents;
      basicPromotions = fetchedPromotions.filter((promo) => promo.basicPromo);
      consumerPromotions = fetchedPromotions.filter(
        (promo) => !promo.basicPromo
      );
      return Promo.count();
    })
    .then((count) => {
      res.status(200).json({
        message: "promotions fetched successfully!",
        promotions: consumerPromotions,
        basicPromotions: basicPromotions,
        maxPromotions: count
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Fetching promotions failed!"
      });
    });
};

exports.fetchConsumerPromotions = (req, res, next) => {
  console.log("req.body.consumerId", req.params.consumerId);
  if (req.params.consumerId) {
    Promo.findById(req.body.consumerId)
      .then((promos) => {
        if (promos) {
          console.log(promos);
          res.status(200).json(promos);
        } else {
          res.status(404).json({ message: "Promo not found!" });
        }
      })
      .catch((error) => {
        res.status(500).json({
          message: "Fetching promo failed!"
        });
      });
  }
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
