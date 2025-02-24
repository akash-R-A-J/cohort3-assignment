async function signup() {
  console.log("signup function");
  const username = document.getElementById("signup-username").value;
  const password = document.getElementById("signup-password").value;

  const res = await axios.post("http://localhost:3000/signup", {
    username,
    password,
  });

  console.log(res.data.msg);
  alert("You are signed up");
}

async function signin() {
  const username = document.getElementById("signin-username").value;
  const password = document.getElementById("signin-password").value;

  const res = await axios.post("http://localhost:3000/signin", {
    username,
    password,
  });

  // this will store the returned token in the website's localStorage
  console.log(res.data.token);
  localStorage.setItem("token", res.data.token);

  alert("You are signed in");
  getUserInformation();
}

async function getUserInformation() {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("sign-in first");
    return res.status().jsn({
      msg: "No token found",
    });
  }

  console.log(token); // for debugging

  const res = await axios.get("http://localhost:3000/me", {
    headers: {
      token,
    },
  });

  document.getElementById("information").innerHTML =
    "Username: " + res.data.username;
}

function logout() {
  localStorage.removeItem("token");
  document.getElementById("information").innerHTML = "";
  alert("You are logged out");
}

getUserInformation();
