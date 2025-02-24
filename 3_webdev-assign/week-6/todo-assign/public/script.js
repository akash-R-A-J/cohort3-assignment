function checkSignupInput() {
  const username = document.getElementById("signup-username").value;
  const password = document.getElementById("signup-password").value;

  if (!username || !password) {
    alert("Please enter both username and password.");
    return;
  }

  return { username, password };
}

function checkSigninInput() {
  const username = document.getElementById("signin-username").value;
  const password = document.getElementById("signin-password").value;

  if (!username || !password) {
    alert("Please enter both username and password.");
    return;
  }

  return { username, password };
}

async function signup() {
  try {
    const { username, password } = checkSignupInput();
    const response = await axios.post("http://localhost:3000/signup", {
      username,
      password,
    });

    alert(response.data.msg); // Show message in alert
  } catch (error) {
    console.error("Signup Error:", error);
    alert(error.response?.data?.msg || "Signup failed. Try again.");
  }
}

async function signin() {
  const { username, password } = checkSigninInput();

  try {
    const response = await axios.post("http://localhost:3000/signin", {
      username,
      password,
    });

    const token = response.headers.authorization;

    if (token) {
      localStorage.removeItem("token");
      localStorage.setItem("token", token);
      alert(response.data.msg);
    }

    showDashboard();
  } catch (error) {
    console.error("Signin Error:", error);
    alert(error.response?.data?.msg || "Signin failed. Try again.");
  }
}

function showDashboard() {
  document.getElementById("auth-container").style.display = "none";
  document.getElementById("dashboard").style.display = "block";
}
