const { z } = require("zod");

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

function addCourseInputValidation(req, res, next) {
  const requireBody = z.object({
    title: z.string().min(3).max(30),
    description: z.string().min(5).max(100),
    price: z.number(),
    imageUrl: z.string().min(1).max(100),
  });

  const parsedDataWithSucces = requireBody.safeParse(req.body);

  if (!parsedDataWithSucces.success) {
    res.status(403).json({ msg: "Invalid Input Format." });
    return;
  }

  next();
}

module.exports = {
  validateSignupInput,
  validateSigninInput,
  addCourseInputValidation,
};
