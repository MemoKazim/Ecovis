const mongoose = require("mongoose");
const servicesSchema = new mongoose.Schema({
  name: {
    az: {
      type: String,
      require: true,
    },
    en: {
      type: String,
      require: true,
    },
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
  responsibleMembers: [String],
});

module.exports = new mongoose.model("Service", servicesSchema);
