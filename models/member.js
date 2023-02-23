const mongoose = require("mongoose");

const membersSchema = new mongoose.Schema({
  fname: {
    az: {
      type: String,
      require: true,
    },
    en: {
      type: String,
      require: true,
    },
  },
  lname: {
    az: {
      type: String,
      require: true,
    },
    en: {
      type: String,
      require: true,
    },
  },
  email: {
    type: String,
    require: true,
  },
  memberType: {
    type: Number,
    require: true,
  },
  position: {
    type: String,
    require: true,
  },
  education: [
    {
      year: Number,
      university: {
        az: {
          type: String,
          require: true,
        },
        en: {
          type: String,
          require: true,
        },
      },
      faculty: {
        az: {
          type: String,
          require: true,
        },
        en: {
          type: String,
          require: true,
        },
      },
    },
  ],
  experience: [
    {
      year: Number,
      position: {
        type: String,
        require: true,
      },
      organization: String,
    },
  ],
  image: {
    data: String,
    contentType: String,
  },
});

module.exports = new mongoose.model("Member", membersSchema);
