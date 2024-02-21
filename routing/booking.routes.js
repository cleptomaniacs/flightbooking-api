const routes = require("express").Router();
const booking = require("../schema/FlightBooking");

const pattern = /^[A-Z]{3}-[0-9]{3}$/;

const getRandomInt = (min, max) => {
  min = Math.ceil(min);

  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1) + min);
};

const validateBody = (data, res) => {
  if (!pattern.test(data.flightId)) {
    return res
      .status(400)
      .json({ error: `Invalid flight ID: ${data.flightId}` });
  }
  if (data.numberOfTickets < 0 || data.numberOfTickets > 40) {
    return res
      .status(400)
      .json({ error: `Number of tickets must be between 0 and 40` });
  }
};

routes.route("/").post(async (req, res, next) => {
  validateBody(req.body, res);
  let data = req.body;
  data.bookingId = getRandomInt(1000, 2000);
  data.amount = getRandomInt(2000, 9000);
  await booking
    .create(data)
    .then((result) => res.status(201).json(result))
    .catch((err) => next(err));
});
routes.route("/").get(async (req, res, next) => {
  await booking
    .find()
    .then((result) => res.json(result))
    .catch((err) => next(err));
});
routes.route("/:id").delete(async (req, res, next) => {
  let id = req.params.id;
  await booking
    .findByIdAndDelete(id)
    .then((result) => res.json(result))
    .catch((err) => next(err));
});
routes.route("/:id").put(async (req, res, next) => {
  validateBody(req.body, res);
  let id = req.params.id;
  let data = req.body;
  data.bookingId = getRandomInt(1000, 2000);
  data.amount = getRandomInt(2000, 9000);
  await booking
    .findByIdAndUpdate(id, data, { new: true })
    .then((result) => res.json(result))
    .catch((err) => next(err));
});

module.exports = routes;
