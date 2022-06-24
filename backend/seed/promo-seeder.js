var Promo = require("../models/promoModel");
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://localhost:27017/Promotions", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    keepAlive: true
  })
  .then((res) => {
    console.log("Connected");
  })
  .catch((error) => {
    console.log("error>>>>>>", error);
  });

var promotions = [
  new Promo({
    promoId: 1,
    consumerId: 1,
    promoType: "Freespin",
    promoCount: 1,
    currency: "GEL"
  }),
  new Promo({
    promoId: 2,
    consumerId: 1,
    promoType: "Freebet",
    promoCount: 1,
    currency: "GEL"
  }),
  new Promo({
    promoId: 3,
    consumerId: 1,
    promoType: "Money",
    promoCount: 1,
    currency: "GEL"
  })
];

//save function is asynchronous
//so we need to check all items are saved before we disconnect to db
let done = 0;
for (const promo of promotions) {
  promo.save(function (err, result) {
    done++;
    if (done == promotions.length) {
      exit();
    }
  });
}

function exit() {
  mongoose.disconnect();
}
