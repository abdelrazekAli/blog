const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access Denied. No token provided");

  try {
    const verified = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("Invalid token.");
  }
};
