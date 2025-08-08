"use strict";
// example-1: Given an array of posistive integers as input, return the maximum value in the array
function getMax(nums) {
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
let userX = {
    name: "Aadarsh",
    age: 25,
    addresses: [],
};
// example-2: given a list of users, filter out the users that are legal (greater than 18 years of age).
function getLegalUsers(users) {
    return users.filter((u) => u.age > 18);
}
const users = [
    { name: "Adarsh", age: 22, addresses: [] },
    { name: "harsh", age: 20, addresses: [] },
    { name: "rohit", age: 15, addresses: [] },
    { name: "abhigyan", age: 10, addresses: [] },
    { name: "rahul", age: 30, addresses: [] },
];
console.log("Legal users are: " + getLegalUsers(users));
