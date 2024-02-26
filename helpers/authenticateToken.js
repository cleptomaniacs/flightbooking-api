const jwt = require("jsonwebtoken");

const secretKey = "xnbidnlxkjkxv@#@$@#%34654767575kdfjkjdk";

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const tokenType = authHeader && authHeader.split(" ")[0];
  if (tokenType !== "Bearer") return res.sendStatus(401);
  if (token == null) return res.sendStatus(401); // No token provided

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden
    req.user = user;
    next(); // Pass the user information to the next middleware
  });
};

module.exports = authenticateToken;
