const { default: mongoose } = require("mongoose");

const User = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: false,
    },
  },
  {
    collection: "users",
  }
);

module.exports = mongoose.model("User", User);
