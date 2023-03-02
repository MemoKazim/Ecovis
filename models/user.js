const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  username: {
    require: true,
    type: String,
  },
  password: {
    require: true,
    type: String,
  },
});

userSchema.plugin(passportLocalMongoose);

module.exports = new mongoose.model("User", userSchema);
