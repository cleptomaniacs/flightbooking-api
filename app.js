const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const booking = require("./routing/booking.routes");
const flight = require("./routing/flight.routes");
const user = require("./routing/auth.routes");
const createDefaultAdmin = require("./helpers/defaultAdmin");
const dbConnection = require("./helpers/dbconnection");

dbConnection();

createDefaultAdmin();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/bookings", booking);
app.use("/api/flights", flight);
app.use("/api/auth", user);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server started, visit: http://localhost:${PORT}`);
});
