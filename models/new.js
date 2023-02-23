const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  title: {
    az: {
      type: String,
      require: true,
    },
    en: {
      type: String,
      require: true,
    },
  },
  content: {
    az: {
      type: String,
      require: true,
    },
    en: {
      type: String,
      require: true,
    },
  },
  date: {
    type: Date,
    require: true,
  },
  image: {
    data: String,
    contentType: String,
  },
});

module.exports = new mongoose.model("New", newsSchema);
