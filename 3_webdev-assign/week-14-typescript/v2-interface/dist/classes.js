"use strict";
// creating an object of the People interface
let person = {
    name: "Akash Raj",
    age: 20,
    greet() {
        return "Hello! Akash";
    },
};
// Manager class implementing People interface
class Manager {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    greet() {
        return "Hello! " + this.name;
    }
}
// creating an object of the Manager class
let user = new Manager("John", 30);
console.log(user.greet());
console.log(user);
// ABSTRACT CLASS
class Users {
    constructor(name) {
        this.name = name;
    }
    hello() {
        console.log("hi there");
    }
}
// class Emp extending User abstract class
class Emp extends Users {
    constructor(name, age) {
        super(name);
        this.age = age;
    }
    greet() {
        return "Hello! " + this.name;
    }
}
