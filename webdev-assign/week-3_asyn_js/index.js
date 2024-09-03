// sum of two numbers
function sum(a, b){
    return a+b;
}

let ans = sum(3, 7);
console.log("sum is " + ans);

// sum from 1 to n
function sumToN(n){
    let sum = 0;
    for(let num=1; num<=n; num++){
        sum += num;
    }
    return sum;
}

let ans2 = sumToN(5);
console.log('sum from 1 to 5 is ' + ans2);