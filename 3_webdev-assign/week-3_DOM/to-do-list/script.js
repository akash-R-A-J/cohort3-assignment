function get_todo() {
  // used to get the text from input field
  const input = document.querySelector("input"); // input variable is referenced to input field
  let value = input.value.trim();
  if (value === "") showAlert("Please enter your to-do.");
  else createStr(value);
}

function createStr(input) {
  // used to create the string of the to-do, using count and value
  let str = "";
  let count = 1;
  const arr = document.getElementsByClassName("todos");

  if (arr.length == 0) str = "1. " + input;
  else {
    // before arr, + is used to convert str to num
    count = arr.length + 1;
    // count = +arr[arr.length - 1].children[0].innerHTML.split(".")[0] + 1;
    str = count + ". " + input;
  }

  addElm(str, count);
}

function addElm(value, count) {
  // used to add the given to-do in the list
  let todos = document.createElement("div");
  todos.id = "todos-" + count;
  todos.classList.add("todos"); // to add the property of the 'todos' class in this element

  let elm = document.createElement("div");
  elm.innerHTML = value; // or elm.appendChild(value)
  todos.appendChild(elm);

  let btn = document.createElement("button");
  btn.classList.add("todos-btn");
  btn.textContent = "Delete";
  btn.addEventListener("click", function () {
    deleteTodo(todos.id);
  });

  //another way to do above things
  // todos.innerHTML = "<div>" + value + "</div> <button class='todos-btn' onclick='deleteTodo(` + count + `)'>Delete</button Delete </button>";

  todos.appendChild(btn);
  document.getElementById("todos").appendChild(todos);
}

// ERROR (resolved): among 3 todos, after deleting the 2nd todo, not able to delete the last todo afterwards
function deleteTodo(id) {
  const toDelete = document.getElementById(id);
  if (toDelete) {
    toDelete.remove(); // Remove the div elm from the DOM
    // or toDelete.parentNode.removeChild(toDelete);
  }

  updateTodo();
}

function updateTodo() {
  const allTodos = document.querySelectorAll(".todos");

  allTodos.forEach((todo, i) => {
    const innerDiv = todo.children[0];
    const text = innerDiv.innerHTML.split(".")[1].trim();
    innerDiv.innerHTML = i + 1 + ". " + text;
    todo.id = "todos-" + (i + 1);
  });
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
