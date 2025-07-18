"use strict";
// 1. TYPES: number, string, boolean, null, undefined, any
// defining variables in ts:
let x = 1;
console.log(x);
let y = 1; // y can be number or string
y = "hello";
console.log(y);
// 2. BASIC FUNCTIONS
// 1. write a function to greet user given their firstname
// things to learn -> how to give types to argument of a function
function greetUser(name) {
    console.log(`hello ${name}`);
}
greetUser("Motu");
// 2. write a function that calculate and returns the sum of two functions?
// things to learn -> how to assign a return type to a function
function sum(a, b) {
    return a + b;
}
console.log(sum(2, 6));
// 3. return true or false based on if a user is 18+
// things to learn -> type inference
function isLegal(age) {
    return age >= 18;
}
console.log(isLegal(20));
console.log(isLegal(10));
// 4. create a function that takes another function as input and runs it after 1 sec
function execute(func) {
    console.log("running execute function");
    setTimeout(func, 1000);
}
execute(() => {
    console.log("running after 1 sec.");
});
// or we can do this too
function delayedCall(helper) {
    setTimeout(helper, 3000);
}
delayedCall(() => {
    console.log("running after 3 sec");
});
// or, we can also do this with the arguments of argument function
function callHelper(helper) {
    let sum = helper(5, 8);
    console.log(sum);
}
callHelper((a, b) => {
    return a + b;
});
// creating an object using the above interface
let user = {
    firstname: "harkirat",
    lastname: "singh",
    age: 21,
};
function isLegalPerson(user) {
    return user.age >= 18; // accessing age from user
}
console.log("Is user legal: " + isLegalPerson(user));
