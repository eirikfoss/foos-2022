const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ImageSchema = new Schema({
  imageName: {
    type: String,
    default: "none",
    required: true
  },
  imageData: {
    type: String,
    required: true
  }
});

let Image = mongoose.model("Image", ImageSchema);

module.exports = Image;
