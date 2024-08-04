// Displaying alert messages
let alertBtn = document.querySelector('#alertBtn');
alertBtn.addEventListener('click', showMsg);

function showMsg(){
    alert("Hello World!");
}

// Taking input from users
let inputBtn = document.querySelector('#inputBtn');
inputBtn.addEventListener('click', inputMsg);

function inputMsg(){
    let name = prompt('Enter your name: ');
    inputBtn.textContent = 'Name: ' + name;
}

// Changing heading text
const myHeading = document.querySelector("h1");
myHeading.textContent = "Hello world!";
