const mongoose = require("mongoose");

const partnersSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  website: {
    type: String,
    require: true,
  },
  details: {
    az: {
      type: String,
      require: true,
    },
    en: {
      type: String,
      require: true,
    },
  },
  image: {
    data: String,
    contentType: String,
  },
});

module.exports = new mongoose.model("Partner", partnersSchema);
