// (2/8/24) Here you will find all the assignments given in the orientation session.

// ASSIGN-0
const crypto = require("crypto");
const input = "100xdevs";
// createHash() is defined in the 'crypto' library
// it will give you the hash of the given input, by running the sha-256 algorithm, in hex format.
const hash = crypto.createHash("sha256").update(input).digest("hex");

console.log("ASSIGN-0");
console.log(hash);

// ASSIGN-1 (output a string whose hash will start with 00000) [finding a nounce]
function findHashWithPrefix(hashPrefix) {
  let val = 1; // input

  while (true) {
    let currHash = crypto
      .createHash("sha256")
      .update(val.toString())
      .digest("hex");

    if (currHash.startsWith(hashPrefix)) {
      break;
    }
    val++;
  }

  return { input: val, hash: hash };
}

console.log("AASIGN-1");
let hashPrefix = '00000';
let res = findHashWithPrefix(hashPrefix);
console.log(res.input + " : " + res.hash);

// ASSIGN-2 (prefix + nonce -> SHA-256 -> starts with 5 0's) : prefix -> 100xdevs (maybe diff)
function findHashWithPrefix2(hashPrefix) {
  let val = 1; // nonce

  while (true) {
    let inputStr = "100xdevs" + val;
    let currHash = crypto
      .createHash("sha256")
      .update(inputStr)

      .digest("hex");

    if (currHash.startsWith(hashPrefix)) {
      break;
    }
    val++;
  }

  return { input: "100xdevs" + val, hash: hash };
}

console.log('ASSIGN-2');
res = findHashWithPrefix2(hashPrefix);
console.log(res.input + " : " + res.hash);

// ASSIGN-4 (find a nonce for the given input such that hash val will start with 5 0's);
// input: harkirat => Raman | Rs 100 Ram => Ankit | Rs 10
function findHashWithPrefix3(hashPrefix) {
    let val = 1; // nonce
    let prefix = "harkirat => Raman | Rs 100 Ram => Ankit | Rs 10";
  
    while (true) {
      let inputStr = prefix + val;
      let currHash = crypto
        .createHash("sha256")
        .update(inputStr)
  
        .digest("hex");
  
      if (currHash.startsWith(hashPrefix)) {
        break;
      }
      val++;
    }
  
    return { input: prefix + val, hash: hash };
  }
  
  console.log('ASSIGN-3');
  res = findHashWithPrefix3(hashPrefix);
  console.log(res.input + " : " + res.hash);
