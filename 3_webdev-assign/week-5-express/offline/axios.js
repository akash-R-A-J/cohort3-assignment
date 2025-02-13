// fetch vs axios

const axios = require("axios");

// 1. fetch()

// simple and clear syntax
async function main1() {
  const response = await fetch("http://localhost:3000/random");
  const json = await response.json();
  console.log(json);
}

main1();

// slightly complex syntax
function main2() {
  // fetch doesn't knows which type of data it will get in return,
  // and that is why we need to convert the response into
  // json or text as per the data received
  // for json use: response.json();
  // for text use: response.text();
  fetch("http://localhost:3000/random").then((response) => {
    response.json().then((jsonData) => {
      console.log(jsonData);
    });
  });
}

main2();

// 2. axios()

async function main3() {
  // only one line of code needed here as compare to using fetch
  // axios knows which type of data it will get in return
  const response = await axios.get("http://localhost:3000/random");
  console.log(response.data);
}

main3();
