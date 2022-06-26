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

exports.updatePromo = (req, res, next) => {
  const promo = new Promo({
    _id: req.body._id,
    promoId: req.body.promoId,
    consumerId: req.body.consumerId,
    promoType: req.body.promoType,
    promoCount: req.body.promoCount,
    currency: req.body.currency
  });

  Promo.updateOne({ _id: req.body._id, consumerId: req.body.consumerId }, promo)
    .then((result) => {
      console.log(result);
      if (result.matchedCount > 0) {
        res.status(200).json({ message: "Promo Update successful!" });
      } else {
        res.status(401).json({ message: "Promo Not updated!" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Couldn't update promo!"
      });
    });
};

exports.getBasicPromotions = (req, res, next) => {
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
        message: "Promotions fetched successfully!",
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
  let allPromotion;
  let basicPromotions;
  let consumerPromotions = [];

  Promo.find()
    .then((fetchedPromotionsDocument) => {
      allPromotion = fetchedPromotionsDocument;

      basicPromotions = allPromotion.filter((promo) => promo.basicPromo);

      consumerPromotions = allPromotion.filter(
        (promo) => promo.consumerId == req.body.consumerId
      );

      let basicPromos = basicPromotions;

      if (!consumerPromotions.length) {
        consumerPromotions = basicPromotions;
      } else {
        consumerPromotions.forEach((promo) => {
          let fundedIndex = basicPromotions.findIndex(
            (basicPromo) => basicPromo.promoId === promo.promoId
          );

          basicPromos.splice(fundedIndex, 1);
        });

        consumerPromotions = consumerPromotions.concat(basicPromos);
      }
      return Promo.count();
    })
    .then((count) => {
      res.status(200).json({
        message: "Consumer promotions fetched successfully!",
        promotions: consumerPromotions,
        maxPromotions: count
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Fetching Consumer promotions failed!"
      });
    });
};

exports.deletePromo = (req, res, next) => {
  Promo.deleteOne({ _id: req.body._id, consumerId: req.body.consumerId })
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
