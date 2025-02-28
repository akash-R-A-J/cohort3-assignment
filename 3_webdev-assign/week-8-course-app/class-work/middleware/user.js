const JWT = require("jsonwebtoken");
const { z } = require("zod");
const { USER_JWT_SECRET } = require("../config");

function userAuth(req, res, next) {
  const token = req.headers.token;
  const decoded = JWT.verify(token, USER_JWT_SECRET);

  if (decoded) {
    req.userId = decoded.userId;
    next();
  } else {
    res.status(403).json({ msg: "Invalid token!" });
  }
}

module.exports = {
  userAuth,
};
