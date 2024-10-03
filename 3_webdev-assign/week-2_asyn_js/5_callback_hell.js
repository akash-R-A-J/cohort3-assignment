/*
Write code that
1. log 'hi' after 1 sec
2. log 'hello' 3 sec after step-1
3. log 'hello there' 5 sec after step-2 
*/

// CALLBACK HELL => when you have to call a async code after another async code and so on
setTimeout(function () {
  console.log("hii");
  setTimeout(function () {
    console.log("hello");
    setTimeout(function () {
      console.log("hello there");
    }, 5000);
  }, 3000);
}, 1000);

// Alternative solution to get rid of callback hell
function hii() {
  console.log("hii");
  setTimeout(hello, 3000);
}

function hello() {
  console.log("hello");
  setTimeout(helloThere, 5000);
}

function helloThere() {
  console.log("hello there");
}

setTimeout(hii, 1000);

// Promisified version for the same
function setTimeoutPromisified(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

// slightly better than callback hell but not too much better
setTimeoutPromisified(1000).then(function () {
  console.log("hi");
  setTimeoutPromisified(3000).then(function () {
    console.log("hello");
    setTimeoutPromisified(5000).then(function () {
      console.log("hello there");
    });
  });
});

// Promise chaining
setTimeoutPromisified(1000)
  .then(function () {
    console.log("hi");
    return setTimeoutPromisified(3000);
  })
  .then(function () {
    console.log("hello");
    return setTimeoutPromisified(5000);
  })
  .then(function () {
    console.log("hello there");
  });

// async await syntax => more better and cleaner way
async function solve() {
  await setTimeoutPromisified(1000);
  console.log("hi");
  await setTimeoutPromisified(3000);
  console.log("hello");
  await setTimeoutPromisified(5000);
  console.log("hello there");
}

solve();

console.log("after solve function");

/*
    Which one gets printed if the async-await code is run  
    option-1
        hi
        hello
        hello there
        after solve function
    
    option-2
        after solve function
        hi
        hello
        hello there
    
    ans => option-2
    (because it does not keep running on the same thread
    under the hood it uses Promises)
*/
