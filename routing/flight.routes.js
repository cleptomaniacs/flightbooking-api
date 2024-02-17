const routes = require("express").Router();
const flight = require("../schema/Flight");

routes.route("/").post(async (req, res, next) => {
  await flight
    .create(req.body)
    .then((result) => res.status(201).json(result))
    .catch((err) => next(err));
});

routes.route("/").get(async (req, res, next) => {
  await flight
    .find()
    .then((result) => res.json(result))
    .catch((err) => next(err));
});

routes.route("/:id").get(async (req, res, next) => {
  let id = req.params.id;
  await flight
    .findById(id)
    .then((result) => res.json(result))
    .catch((err) => next(err));
});
routes.route("/:id").put(async (req, res, next) => {
  let id = req.params.id;
  await flight
    .findByIdAndUpdate(id, req.body, { new: true })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => next(err));
});

routes.route("/:id").delete(async (req, res, next) => {
  let id = req.params.id;
  await flight
    .findByIdAndDelete(id)
    .then((result) => res.json(result))
    .catch((err) => next(err));
});

module.exports = routes;
