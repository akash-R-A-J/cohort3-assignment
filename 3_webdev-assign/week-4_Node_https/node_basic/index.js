// const fs = require('fs');
const path = require('path');

function add(a, b){
    console.log(a+b);
}

add(3, 6);

console.log(__dirname); // prints the curr path, it's a global variable
console.log(path.join(__dirname, 'index.js'));