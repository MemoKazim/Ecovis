const mongoose = require("mongoose");

const ecovisShcema = new mongoose.Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phoneNumber: Number,
  message: {
    type: String,
    require: true,
  },
});

module.exports = new mongoose.model("Contact", ecovisShcema);
