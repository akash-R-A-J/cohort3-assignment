// example-1: Given an array of posistive integers as input, return the maximum value in the array
function getMax(nums: number[]): number {
  let maxValue = -100000000;

  for (let i = 0; i < nums.length; i++) {
    if (maxValue < nums[i]) {
      maxValue = nums[i];
    }
  }

  return maxValue;
}

const max = getMax([2, 5, 7, 4, 9, 3]);
console.log(max);

// if user have multiple addresses
interface Address {
  city: string;
  pincode: number;
}

interface UserX {
  name: string;
  age: number;
  addresses: Address[];
}

let userX: UserX = {
  name: "Aadarsh",
  age: 25,
  addresses: [],
};

// example-2: given a list of users, filter out the users that are legal (greater than 18 years of age).
function getLegalUsers(users: UserX[]): UserX[] {
  return users.filter((u) => u.age > 18);
}

const users: UserX[] = [
  { name: "Adarsh", age: 22, addresses: [] },
  { name: "harsh", age: 20, addresses: [] },
  { name: "Rohit", age: 15, addresses: [] },
  { name: "Abhigyan", age: 10, addresses: [] },
  { name: "Rahul", age: 30, addresses: [] },
];

console.log("Legal users are: " + getLegalUsers(users));
