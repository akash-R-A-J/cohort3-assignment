// datatypes
const x = 5;
let y = 6;
var z = x + y;

console.log(x, y,", sum : ", z);

// boolean
var yes = true;
var no = false;

// String, if-else, switch 
const userName = "Akash Raj";
if(yes){
    console.log("Name: ", userName);
}else{
    console.log("Name: Not Found");
}

// loops - for, while, do-while, for-in, for-of
// functions
function add(arr){
    let sum = 0;
    for(let i=0; i<5; i++){
        sum += arr[i];
    }

    return sum;
}

const arr = [1, 2, 3, 4, 5];
console.log("sum: ", add(arr));

// string - inbuilt functions
let str1 = 'This is a string';
let str2 = 'This is \"another\" string';

let str3 = str1 + ' ' + str2;

console.log(str1,'\n', str2);
console.log(str3);

let str4 = '123';
console.log(Number(str4));

console.log(str1.length); // get length
console.log(str1.split(' ')); // split the string
console.log(str1.charAt(8)); // charAt
console.log(str1.indexOf('string')); // gives starting index
console.log(str1.slice(5, 9)); // get substring
console.log(str1.toUpperCase()); // convert to upper case
console.log(str1.toLowerCase()); // convert to lower case
console.log(str1[5]); // string indexing


// User-defined datatypes
const stu = { // object
    name: 'Akash Raj',
    class: 8
}

console.log(stu.name); // accessing elm of the objects
console.log(stu['class']);

// array
const strs = ['abc', 'def', 'ghi', 'jkl'];
console.log(strs);

for(let i=0; i<strs.length; i++){
    console.log(strs[i]);
}

for(let str in strs){ // for-in : gives index
    console.log(str);
}

for(let str of strs){ // for-of : gives value
    console.log(str);
}

const nums = [1, 2, 3, 4, 5, 2];
nums.push(10); // insert elm at the end
nums.unshift(0); // insert elms at the start
console.log(nums);
console.log(nums.pop()); // remove last elm
console.log(nums.shift()); // remove first elm
console.log(nums.indexOf(3)); // return index of 1st occurrance
console.log(nums.lastIndexOf(2)); // return index of last occurrance
console.log(nums.includes(5)); // return true if nums contain 5
// console.log(nums.find()); //??

// classes (how? where is stores _x and _y)
class Pair{
    constructor(x, y) {
        this.x = x;
        this.y = y;
        console.log('x: ' + this.x + ', y: ' + this.y);
    }

    set x(value) {
        this._x = value;
    }

    get x() {
        return this._x;
    }
}

let obj =  new Pair(3, 10);
console.log(obj.x + obj.y);
obj.x = 20;
console.log(obj.x + obj.y);
