const router = require("express").Router();
let Image = require("../models/images.models");

router.route("/").get((req, res) => {
  Image.find()
    .then(images => res.json(images))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const imageName = req.body.imageName;
  const imageData = req.body.imageData;

  const newImage = new Image({ imageName, imageData });

  newImage
    .save()
    .then(() => res.json(newImage))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Image.findById(req.params.id).then(image => {
    image.imageName = req.body.imageName;
    image.imageData = req.body.imageData;

    image
      .save()
      .then(() => res.json("Image updated"))
      .catch(err => res.status(400).json("Error: " + err));
  });
});

router.route("/:id").delete((req, res) => {
  Image.findByIdAndDelete(req.params.id)
    .then(() => res.json("Image deleted"))
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
