"use strict";
// 1. OPTIONAL FIELD
let user1 = {
    name: "harkirat",
    age: 22,
    address: {
        city: "Noida",
        country: "India",
        pincode: 893849
    }
};
let user2 = {
    name: "Sanskar",
    age: 18
};
function isLegal(user) {
    return user.age > 18;
}
console.log("Is " + user1.name + " a legal person: " + `${isLegal(user1) ? "Yes" : "No"}`);
console.log("Is " + user2.name + " a legal person: " + `${isLegal(user1) ? "Yes" : "No"}`);
// implementing Person interface as a class Employee
class Employee {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    greet(phrase) {
        console.log(phrase + this.name);
    }
}
// creating an object of class Employee
let emp = new Employee("harkirat", 22);
emp.greet("hello! "); // calling the greet function on emp object
