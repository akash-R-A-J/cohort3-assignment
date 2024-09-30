// 1.sum of two numbers
function sum(a, b) {
  return parseInt(a) + parseInt(b);
} // parseInt convert 'a' to int if its a string or other

let ans = sum(3, 7);
console.log("sum is " + ans);

// 2.sum from 1 to n
function sumToN(n) {
  let sum = 0;
  for (let num = 1; num <= n; num++) {
    sum += num;
  }
  // or use n*(n+1)/2;
  return sum;
}

let ans2 = sumToN(5);
console.log("sum from 1 to 5 is " + ans2);

// 3.reading from a file - using synchrounous function
const fs = require("fs");

// readFileSync() -> synchronous function
console.log("\nSynchrounous function");
const contents_a = fs.readFileSync("a.txt", "utf-8"); // I/O bound task
console.log("a.txt" + contents_a); // CPU-bound task

const contents_b = fs.readFileSync("b.txt", "utf-8");
console.log("b.txt : " + contents_b);

// 4.reading from a file - using asynchronous function
// readFile() -> asynchronous function
console.log("\nAsynchrounous function");
fs.readFile("a.txt", "utf-8", function (err, contents_a) {
  console.log("a.txt : " + contents_a);
});

fs.readFile("b.txt", "utf-8", function (err, contents_a) {
  console.log("b.txt : " + contents_a);
});

// or you can also use the below code to read file asynchronously.
function print(err, data) {
  if (err) console.log(err);
  console.log(data);
}

fs.readFile("a.txt", "utf-8", print);

// Functional Arguments
function sub(a, b) {
  return a - b;
}

function module(a, b) {
  return a * b;
}

function doOperation(a, b, op) {
  return op(a, b);
}

let ans3 = doOperation(8, 2, sub);
console.log("8-2 = " + ans3);
let ans4 = doOperation(5, 4, module);
console.log("5*4 = " + ans4);
