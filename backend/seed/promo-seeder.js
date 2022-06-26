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
    promoType: "Freespin",
    promoCount: 0,
    currency: "GEL",
    basicPromo: true
  }),
  new Promo({
    promoId: 2,
    promoType: "Freebet",
    promoCount: 0,
    currency: "GEL",
    basicPromo: true
  }),
  new Promo({
    promoId: 3,
    promoType: "Money",
    promoCount: 0,
    currency: "GEL",
    basicPromo: true
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
