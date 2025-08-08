// 1. OPTIONAL FIELD

interface User{
    name: string;
    age: number;
    // address will optional (used ? for optional field)
    address?: Address; // using another interface inside this interface
}

let user1: User = {
    name: "harkirat",
    age: 22,
    address:{
        city: "Noida",
        country: "India",
        pincode: 893849
    }
}

let user2: User = { // here address is not defined but is valid because of optional field
    name: "Sanskar",
    age: 18
}

function isLegal(user: User): boolean {
    return user.age > 18;
}

console.log("Is " + user1.name + " a legal person: " + `${isLegal(user1) ? "Yes" : "No"}`);
console.log("Is " + user2.name + " a legal person: " + `${isLegal(user1) ? "Yes" : "No"}`);

// 2. AN INTERFACE INSIDE ANOTHER INTERFACE

interface Address {
    city: string;
    country: string;
    pincode: number;
}

interface OfficeBuilding {
    name: string;
    address: Address; // using the above Address interface inside this interface
}

// 3. IMPLEMENT INTERFACE AS A CLASS

interface Person {
    name: string;
    age: number;
    greet(phrase: string): void;
    greet2?: () => string; // is optional, using arrow function, returns string if implemented
}

// implementing Person interface as a class Employee
class Employee implements Person{
    name: string;
    age: number;
    
    constructor(name: string, age: number){
        this.name = name;
        this.age = age;
    }
    
    greet(phrase: string): void {
        console.log(phrase + this.name);
    }
}

// creating an object of class Employee
let emp = new Employee("harkirat", 22);
emp.greet("hello! "); // calling the greet function on emp object