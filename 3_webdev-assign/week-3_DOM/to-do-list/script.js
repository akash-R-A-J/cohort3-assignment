function get_todo() {
  // used to get the text from input field
  const input = document.querySelector("input"); // input variable is referenced to input field
  let value = input.value.trim();
  console.log(value);
  if (value === "") showAlert("Please enter your to-do.");
  else createStr(value);
}

function createStr(input) {
  // used to create the string of the to-do, using count and value
  const arr = document.querySelectorAll("h4");
  let str = "";
  if (arr.length == 0) str = "1. " + input;
  // before arr, + is used to convert str to num
  else str = +arr[arr.length - 1].innerHTML.split(".")[0] + 1 + ". " + input;
  addElm(str);
}

function addElm(value) {
  // used to add the given to-do in the list
  let h4 = document.createElement("h4");
  h4.innerHTML = value; // or h4.appendChild(value)
  document.getElementById("todos").appendChild(h4);
}

// Function to show the custom alert
function showAlert(message) {
  document.getElementById("alert-message").innerText = message;
  document.getElementById("custom-alert").style.display = "block";
  document.getElementById("overlay").style.display = "block";
}

// Function to close the custom alert
function closeAlert() {
  document.getElementById("custom-alert").style.display = "none";
  document.getElementById("overlay").style.display = "none";
}
