// CALLBACK BASED APPROACH
function logName() {
  console.log("Akash Raj");
}

setTimeout(logName, 5000); // when 3s passes, logName function is called back (callback).

// PROMISE BASED APPROACH
// you can use any of the 2 approach for a task, but promise based approach will give you a cleaner way to do that.
// using a promise is easy but defining your own promise is hard.

function logMessage() {
  console.log("10 seconds has passed.");
}

// returns an object of a promise class
function setTimeoutPromisified(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// setTimeoutPromisified(3000).then(logMessage);
let p = setTimeoutPromisified(10000);
console.log(p);
p.then(logMessage);

// functional argument with setTimeout - async function
function promiseCallback(resolve) {
  setTimeout(resolve, 3000);
}

promiseCallback(function () {
  console.log("hiii");
});

// Promisified version of setTimeout function
function setTimeoutPromisified(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

// why and how does this code : new Promise((resolve) => setTimeout(resolve, duration));
// converts a simple setTimeout => promisified version of setTimeout?
setTimeoutPromisified(1000).then(logName);

// Promisified version of readfile
function readFilePromisified() {
  return new Promise(function (resolve, reject) {
    fs.readFile("a.txt", "utf8", function (err, data) {
      if (err) {
        reject("File not found.");
      } else {
        resolve(data);
      }
    });
  });
}

readFilePromisified()
  .then(function (x) {
    console.log("File has been read:\n" + x.toString());
  })
  .catch(function (e) {
    console.log(e);
  });
