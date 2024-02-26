const routes = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require("../schema/User");

const secretKey = "xnbidnlxkjkxv@#@$@#%34654767575kdfjkjdk";

const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

routes.route("/register").post(async (req, res, next) => {
  const data = req.body;
  if (!pattern.test(data.password)) {
    return res.status(400).json({ error: "Invalid password" });
  }
  data.username = data.username.toLowerCase();
  data.role = data.role.toLowerCase();
  const userDB = await user
    .findOne({ username: data.username })
    .then((u) => u)
    .catch((err) => next(err));
  if (userDB) {
    return res.status(400).json({ error: "Incorrect username or password" });
  }
  data.password = (await bcrypt.hash(data.password, 10)).toString();
  await user
    .create(data)
    .then((u) => res.status(201).json(u))
    .catch((err) => next(err));
});

routes.route("/login").post(async (req, res, next) => {
  const data = req.body;
  const userDB = await user
    .findOne({ username: data.username.toLowerCase() })
    .then((u) => u)
    .catch((err) => next(err));
  if (!userDB) {
    return res.status(400).json({ error: "Incorrect username or password" });
  }
  const compare = await bcrypt.compare(data.password, userDB.password);
  if (!compare) {
    return res.status(400).json({ error: "Incorrect username or password" });
  }
  let userz = { _id: userDB._id, role: userDB.role };
  const token = await jwt.sign(userz, secretKey);
  const response = { token: token, user: userz };
  return res.json(response);
});

module.exports = routes;
