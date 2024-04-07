const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxLength: 20,
    },
    lastName: {
      type: String,
      required: true,
      maxLength: 20,
    },
    email: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      maxLength: 20,
    },
    password: {
      type: String,
      required: true,
    },
    interestCategories: {
      type: "Array",
    },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);

module.exports = {
    User,
  };