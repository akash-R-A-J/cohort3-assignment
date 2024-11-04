function get_todo() {
  // used to get the text from input field
  const input = document.querySelector("input"); // input variable is referenced to input field
  let value = input.value.trim();
  if (value === "") showAlert("Please enter your to-do.");
  else createStr(value);
}

function createStr(input) {
  // used to create the string of the to-do, using count and value
  const arr = document.getElementsByClassName("todos");
  let str = "";
  let count = 1;

  if (arr.length == 0) str = "1. " + input;
  // before arr, + is used to convert str to num
  else {
    count = +arr[arr.length - 1][0].innerHTML.split(".")[0] + 1;
    str = count + ". " + input;
  }

  addElm(str, count);
}

function addElm(value, count) {
  // used to add the given to-do in the list
  let todos = document.createElement("div");
  todos.id = "todos-" + count;
  todos.classList.add("todos");
  todos.dataset.index = count; // dataset.index is used to indexing the todos for deleting purpose

  let elm = document.createElement("div");
  elm.innerHTML = value; // or h4.appendChild(value)
  todos.appendChild(elm);

  let btn = document.createElement("button");
  btn.classList.add("todos-btn");
  btn.textContent = "Delete";
  btn.addEventListener("click", function () {
    deleteTodo(count)
  });

  todos.appendChild(btn);
  document.getElementById("todos").appendChild(todos);
}

function deleteTodo(index){
  const toDelete = document.querySelector(`div[data-index='${index}']`);
  if (toDelete) {
    toDelete.remove(); // Remove the div from the DOM
  }
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
