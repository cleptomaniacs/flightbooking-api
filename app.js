const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const booking = require("./routing/booking.routes");
const flight = require("./routing/flight.routes");

const connectDb = () => {
  mongoose
    .connect("mongodb://localhost/flightbooking")
    .then((con) =>
      console.log(`Connected to mongoDB: ${con.connections[0].name}`)
    )
    .catch((err) => console.log(err));
};

connectDb();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/booking", booking);
app.use("/api/flight", flight);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Connected: http://localhost:${PORT}`);
});
