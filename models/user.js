const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  username: {
    require: true,
    type: String,
  },
  hashed_password: {
    require: true,
    type: Buffer,
  },
  Salt: {
    require: true,
    type: Buffer,
  },
});

userSchema.plugin(passportLocalMongoose);

module.exports = new mongoose.model("User", userSchema);
