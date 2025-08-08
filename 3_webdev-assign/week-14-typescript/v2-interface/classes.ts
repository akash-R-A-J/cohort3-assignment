// defining an interface
interface People {
  name: string;
  age: number;
  greet: () => string;
}

// creating an object of the People interface
let person: People = {
  name: "Akash Raj",
  age: 20,
  greet() {
    return "Hello! Akash";
  },
};

// Manager class implementing People interface
class Manager implements People {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greet() {
    return "Hello! " + this.name;
  }
}

// creating an object of the Manager class
let user: Manager = new Manager("John", 30);
console.log(user.greet());
console.log(user);

// ABSTRACT CLASS
abstract class Users {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  abstract greet(): string;
  hello() {
    console.log("hi there");
  }
}

// class Emp extending User abstract class
class Emp extends Users {
  age: number;
  constructor(name: string, age: number) {
    super(name);
    this.age = age;
  }
  
  greet(): string {
    return "Hello! " + this.name;
  }
}
