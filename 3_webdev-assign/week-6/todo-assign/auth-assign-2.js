/*
    [clone from here: https://github.com/100xdevs-cohort-2/assignments/tree/master/week-3/02-jwt]
    
    ->  Write a function that takes in a username and password and returns a JWT token with the
        username encoded. Should return null if the username is not a valid email or if the password
        is less than 6 characters. Try using the zod library here
    ->  Write a function that takes a jwt as input and returns true if the jwt can be DECODED (not
        verified). Return false otherwise.
    ->  Write a function that takes a jwt as input and returns true if the jwt can be VERIFIED.
        Return false otherwise.
        
    ->  To test,go to the 02-jwt folder and run `npx jest ./tests`
 */

const zod = require("zod");
const JWT = require("jsonwebtoken");
const JWT_SECRET = "WIEUAKHUDWHDWWAUEXE2IOJE";

const emailSchema = zod.string().email();
const passwordSchema = zod.string().min(6);

function signJWT(username, password) {
  const usernameResponse = emailSchema.safeParse(username);
  const passwordResponse = passwordSchema.safeParse(password);

  if (!usernameResponse.success || !passwordResponse.success) {
    return null;
  }

  return JWT.sign({ username }, JWT_SECRET);
}

function decodeJWT(token) {
  return JWT.decode(token) ? true : false;
}

function verifyJWT(token) {
  try {
    JWT.verify(token, JWT_SECRET);
    return true;
  } catch (e) {
    return false;
  }
}

// testing
// 1. signJWT
const test1 = signJWT("edgkawzo", "wieuwlswbfue"); // null (not proper email)
const test2 = signJWT("edgkawzo@gmail.com", "wieuwlswbfue"); // token
const test3 = signJWT("edgkawzo@gmail.com", "wie"); // null (pass < 6)

// logging output
console.log("test-1: ", test1);
console.log("test-2: ", test2);
console.log("test-3: ", test3);

// 2. decodeJWT
const test4 = decodeJWT("uiefqxwqoi");
const test5 = decodeJWT(test2);

// logging output
console.log("test-4: ", test4); // false
console.log("test-5: ", test5); // true

// 3. verifyJWT
const test6 = verifyJWT("uiefqxwqoi");
const test7 = verifyJWT(test2);

// logging output
console.log("test-6: ", test6); // false
console.log("test-7: ", test7); // true
