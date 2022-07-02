import multer from "multer";
import sharp from "sharp";
import Consumer from "../models/consumerModel";

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 404), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

export const uploadUserPhoto = upload.single("image");

export const resizeUser = async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.body.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(240, 240)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`backend/images/${req.file.filename}`);

  next();
};

export const createConsumer = (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const consumer = new Consumer({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    gender: req.body.gender,
    personalNumber: req.body.personalNumber,
    phone: req.body.phone,
    address: req.body.address,
    country: req.body.country,
    city: req.body.city,
    email: req.body.email,
    imagePath: url + "/images/" + req.file.filename,
    creator: req.userData.userId
  });
  consumer
    .save()
    .then((createdConsumer) => {
      res.status(201).json({
        message: "Consumer added successfully",
        consumer: {
          ...createdConsumer,
          id: createdConsumer._id
        }
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Creating a consumer failed!"
      });
    });
};

export const updateConsumer = (req, res, next) => {
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename;
  }
  const consumer = new Consumer({
    _id: req.body.id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    gender: req.body.gender,
    personalNumber: req.body.personalNumber,
    phone: req.body.phone,
    address: req.body.address,
    country: req.body.country,
    city: req.body.city,
    email: req.body.email,
    imagePath: imagePath,
    creator: req.userData.userId
  });

  Consumer.updateOne(
    { _id: req.params.id, creator: req.userData.userId },
    consumer
  )
    .then((result) => {
      if (result.matchedCount > 0) {
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Couldn't update consumer!"
      });
    });
};

export const getConsumers = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const consumerQuery = Consumer.find();
  let fetchedConsumers;
  if (pageSize && currentPage) {
    consumerQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  consumerQuery
    .then((documents) => {
      fetchedConsumers = documents;
      return Consumer.count();
    })
    .then((count) => {
      res.status(200).json({
        message: "Consumers fetched successfully!",
        consumers: fetchedConsumers,
        maxConsumers: count
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Fetching consumers failed!"
      });
    });
};

export const getConsumer = (req, res, next) => {
  Consumer.findById(req.params.id)
    .then((consumer) => {
      if (consumer) {
        res.status(200).json(consumer);
      } else {
        res.status(404).json({ message: "Consumer not found!" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Fetching consumer failed!"
      });
    });
};

export const deleteConsumer = (req, res, next) => {
  Consumer.deleteOne({ _id: req.params.id, creator: req.userData.userId })
    .then((result) => {
      if (result.deletedCount > 0) {
        res.status(200).json({ message: "Deletion successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Deleting consumers failed!"
      });
    });
};
