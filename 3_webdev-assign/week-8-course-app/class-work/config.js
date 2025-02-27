// to avoid circular dependencies
require("dotenv").config();

const DB_URL = process.env.DB_URL;
const PORT = Number(process.env.PORT);
const SALT_ROUND = Number(process.env.SALT_ROUND);
const USER_JWT_SECRET = process.env.JWT_SECRET;
const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET;

module.exports = {
  PORT,
  DB_URL,
  SALT_ROUND,
  USER_JWT_SECRET,
  ADMIN_JWT_SECRET,
};
