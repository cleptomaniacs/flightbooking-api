const { default: mongoose } = require("mongoose");

const Flight = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    flightId: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
  },
  {
    collection: "flights",
  }
);

module.exports = mongoose.model("Flights", Flight);
