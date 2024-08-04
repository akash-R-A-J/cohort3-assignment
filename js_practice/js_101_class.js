// assign-0
const color = 'Black';
let ht = 56; // in cm
var likePizza = true;

// assign-1
function sum(str){
    let arr = str.split(' ');
    return Number(arr[0]) + Number(arr[1]);
}

console.log(sum('10 20'));

// assign-2
function canVote(age){
    if(age > 18) return true;
    else return false;
}

console.log(canVote(15)); // 15 <= 18
console.log(canVote(30)); // 30 > 18

// if-else assignment
function evenOrOdd(n){
    if(n%2 == 0){
        console.log('The number is even.');
    }else{
        console.log('The number is odd.');
    }
}

evenOrOdd(5);
evenOrOdd(8);

// function assignment
function sumUptoN(n){
    let sum = 0;
    while(n>0){
        sum += n;
        n--;
    }

    return sum;
}

console.log(sumUptoN(5));