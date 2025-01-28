const axios = require("axios");

// input for diff type of req methods
// 1. get => (url, headers);
// 2. post, put, delete => (url, body, headers);

// syntax-1 : req methods are used with '.' operator
async function syntax1() {
  const response = await axios.get("http://localhost:3000/random");
  console.log(response.data);
}

syntax1();

// syntax-2 : req method types are defined as a parameter
async function syntax2() {
  const response = await axios({
    method: "POST",
    url: "https://httpdump.app/dumps/72ce72d1-23b1-422c-8a2c-551f9df2ee22",
    data: { name: "Akash", pass: "12345" },
    headers: { msg: "hello there" },
  });

  console.log(response.data);
}

syntax2();

// syntax-3 : using all as parameters without giving field
async function syntax3() {
  const response = await axios.post(
    "https://httpdump.app/dumps/72ce72d1-23b1-422c-8a2c-551f9df2ee22",
    { name: "Raj", pass: "6789" },
    { headers: { msg: "hello there" } }
  );

  console.log(response.data);
}

syntax3();

