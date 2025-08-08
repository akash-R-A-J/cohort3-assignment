/*
    1. BASIC TYPES
    2. BASIC FUNCTIONS
    3. ASSIGNMENTS
    4. INTERFACE
    5. TYPES (union and intersection)
*/

/*---------------------------------------------------------------------------------------------*/

// 1. TYPES: number, string, boolean, null, undefined, any

// defining variables in ts:
let x: number = 1;
console.log(x);

let y: number | string = 1; // y can be number or string
y = "hello";
console.log(y);

// 2. BASIC FUNCTIONS

// 1. write a function to greet user given their firstname
// things to learn -> how to give types to argument of a function
function greetUser(name: string) {
  console.log(`hello ${name}`);
}

greetUser("Motu");

// 2. write a function that calculate and returns the sum of two number?
// things to learn -> how to assign a return type to a function
function sum(a: number, b: number): number {
  return a + b;
}
console.log(sum(2, 6));

// 3. return true or false based on if a user is 18+
// things to learn -> type inference
function isLegal(age: number): boolean {
  return age >= 18;
}
console.log(isLegal(20));
console.log(isLegal(10));

// 4. create a function that takes another function as input and runs it after 1 sec
function execute(func: Function) {
  console.log("running execute function");
  setTimeout(func, 1000);
}

execute(() => {
  console.log("running after 1 sec.");
});

// or we can do this too
function delayedCall(helper: () => void) {
  setTimeout(helper, 3000);
}

delayedCall(() => {
  console.log("running after 3 sec");
});

// or, we can also do this with the arguments of argument function
function callHelper(helper: (a: number, b: number) => number) {
  let sum: number = helper(5, 8);
  console.log(sum);
}

callHelper((a: number, b: number): number => {
  return a + b;
});

// 3. INTERFACE

// definig an interface
interface UserType {
  firstname: string;
  lastname: string;
  age: number;
}

// creating an object using the above interface
let user: UserType = {
  firstname: "harkirat",
  lastname: "singh",
  age: 21,
};

// passing the user object as a parameter
function isLegalPerson(user: UserType): boolean {
  return user.age >= 18; // accessing age from user
}

console.log("Is user legal: " + isLegalPerson(user));

// 4. TYPES

// UNION -> or

// similar to interface, but lets you do some other things like: union, intersection
type StringOrNumber = string | number; // union (you can't do this using interface)

function printId(id: StringOrNumber) {
  console.log("ID: " + id);
}

printId(101);
printId(202);

// INTERSECTION -> and

interface Employee {
  name: string;
  age: number;
}

interface Manager {
  name: string;
  department: string;
}

type TeamLead = Employee & Manager; // intersection (can't do this using interface)

let t: TeamLead = {
  name: "harkirat",
  age: 21,
  department: "Software Developer",
};
