// interfaces and types
// 1. create two types called User and Admin,
//    then create a function that takes either a user os an admin as an input, and returns a string saying "Welcome, [name]".

type Userss = {
  name: string;
  age: number;
};

type Admin = {
  name: string;
  isLegal: boolean;
  permissions: string;
};

// union of Userss and Admin
type UserOrAdmin = Userss | Admin;

function greetUserOrAdmin(people: UserOrAdmin): string {
  return "Welcome, " + people.name; // we can't use other fields other than name, coz they aren't common in both
}

let u: UserOrAdmin = {
  name: "Abhigyan",
  age: 20,
};

console.log(greetUserOrAdmin(u));

let a: UserOrAdmin = {
  name: "Sanskar",
  isLegal: false,
  permissions: "nothing",
};

console.log(greetUserOrAdmin(a));
