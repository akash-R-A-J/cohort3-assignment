const JWT = require("jsonwebtoken");
const { z } = require("zod");
const { USER_JWT_SECRET } = require("../config");

// input validation middleware for signup endpoints
function validateSignupInput(req, res, next) {
  // input validation
  const requiredBody = z.object({
    email: z.string().email().min(6).max(50),
    password: z.string().min(4).max(50),
    firstName: z.string().min(3).max(50),
    lastName: z.string().min(3).max(50),
  });

  const parsedDataWithSuccess = requiredBody.safeParse(req.body);

  if (!parsedDataWithSuccess.success) {
    return res
      .status(403)
      .json({ msg: "Invalid input", error: parsedDataWithSuccess.error });
  }

  next();
}

// input validation middleware for signin endpoints
async function validateSigninInput(req, res, next) {
  // input validation
  const requiredBody = z.object({
    email: z.string().email().min(6).max(50),
    password: z.string().min(4).max(50),
  });

  const parsedDataWithSuccess = await requiredBody.safeParse(req.body);

  if (!parsedDataWithSuccess.success) {
    return res
      .status(403)
      .json({ msg: "Invalid input", error: parsedDataWithSuccess.error });
  }

  next();
}

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
  validateSignupInput,
  validateSigninInput,
  userAuth,
};
