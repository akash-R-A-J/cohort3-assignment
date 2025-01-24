// map, filter, arrow functions

// 1. Arrow function
function sum1(a, b) { // normal
  return a + b;
}

const ans1 = sum1(3, 6);
console.log(ans1);

const sum2 = (a, b) => { // arrow
  return a + b;
};

const ans2 = sum2(5, 8);
console.log(ans2);

// 2. map function
// input => arr, function
// output => each elm of arr is processed in the given function
// Que: multiply each elm of the given arr by 2

const input = [1, 2, 3, 4, 5]; // input1
function helper1(a) {
  // input2
  return a * 2;
}

const newArr1 = input.map(helper1);
console.log(newArr1);

// 3. filter
// used to apply some condition on a given input (e.g. array)
// Que: print all the even numbers present in the given array

// (returns true/false)
function helper2(n) {
  if (n % 2 == 0) {
    return true;
  } else {
    return false;
  }
}

const newArr2 = input.filter(helper2);
console.log(newArr2);
