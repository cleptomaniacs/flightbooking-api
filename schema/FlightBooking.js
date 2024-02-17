const { default: mongoose } = require("mongoose");

const Booking = new mongoose.Schema(
  {
    passengerName: {
      type: String,
      required: true,
    },
    numberOfTickets: {
      type: Number,
      required: true,
    },
    flightId: {
      type: String,
      required: true,
    },
  },
  {
    collection: "bookings",
  }
);

module.exports = mongoose.model("Booking", Booking);
