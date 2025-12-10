const jwt = require("jsonwebtoken");
require("dotenv").config();

function auth(req, res, next) {
  const authHeader = req.headers.authenticator;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ msg: "Authorization header missing or malformed" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const verifyingtoken = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = verifyingtoken.id;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid or expired token" });
  }
}

module.exports = { auth };
