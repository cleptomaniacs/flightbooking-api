const routes = require("express").Router();
const booking = require("../schema/FlightBooking");

routes.route("/").post(async (req, res, next) => {
  await booking
    .create(req.body)
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
  let id = req.params.id;
  await booking
    .findByIdAndUpdate(id, req.body, { new: true })
    .then((result) => res.json(result))
    .catch((err) => next(err));
});

module.exports = routes;
