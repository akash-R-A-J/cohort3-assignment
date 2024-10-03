const fs = require("fs");

const content_a = fs.readFileSync("a.txt", "utf-8");
console.log(content_a);

// setTimeout() async function
function timeout() {
  console.log("click the button");
}

console.log("Hii");
setTimeout(timeout, 15000); // it will call the timeout function after 15sec and move on to the next line
console.log("Welcome to loupe.");

let c = 0; // 3-4s
for (let i = 1; i <= 100000000; i++) {
  c += 1;
}

console.log("Expensive operation done.");

// creating a counter
let count = 0;
function callback() {
  count++;
  console.clear();
  console.log(count);
  if (count < 20) {
    setTimeout(callback, 1000); // callback again after 1 sec
  }
}

setTimeout(callback, 1000);

/* Whilch line will get log first? (after welcome to loupe.)
    Option 1
        Hii
        Welcome to loupe.
        Expensive operation done
        click the button

    Option 2
        Hii
        Welcome to loupe.
        click the button
        Expensive operation done


    Ans: Option 1
*/
