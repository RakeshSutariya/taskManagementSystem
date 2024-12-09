const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    authorization: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const UserModel = mongoose.model("userMaster", userSchema, "userMaster");

module.exports = UserModel;
