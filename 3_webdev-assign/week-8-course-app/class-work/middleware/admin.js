const JWT = require("jsonwebtoken");
const { ADMIN_JWT_SECRET } = require("../config");

function adminAuth(req, res, next) {
  const token = req.headers.token;
  const decoded = JWT.verify(token, ADMIN_JWT_SECRET);

  if (decoded) {
    req.adminId = decoded.adminId;
    next();
  } else {
    res.status(403).json({ msg: "Invalid token!" });
  }
}

module.exports = {
    adminAuth,
}
