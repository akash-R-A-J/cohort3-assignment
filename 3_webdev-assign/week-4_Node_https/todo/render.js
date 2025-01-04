let todos = []; // state
let condition = false;
// false - it means you can click on any button
// when set to true, other button will not work
// like while editing, you can't delete or perform any action until you have edited one.

function addTodo() {
  if(condition){
    alert("Please update the current to-do first!");
    return;
  }
  
  const input = document.querySelector("input");
  const value = input.value.trim();

  if (value == "") {
    alert("Please enter a to-do.");
    return;
  }

  todos.push({ title: value });
  input.value = ""; // clear the input field

  render();
}

function deleteTodo(index) {
  if(condition){
    alert("Please update the current to-do first!");
    return;
  }
  
  console.log("deleting todo - " + index);
  todos.splice(index, 1);
  render();
}

// using DOM manipulation
function editTodo(index){
  if(condition){
    alert("Please update the current to-do first!");
    return;
  }
  
  condition = true; // other buttons won't work until you update the current one
  
  let input = document.createElement("input");
  input.id = "updateInput";
  input.value = todos[index].title;
  console.log(todos[index].title);
  
  let btn  = document.createElement("button");
  btn.textContent = "Update";
  btn.id = "updateBtn";
  btn.classList.add("todos-btn");
  btn.addEventListener("click", function () {
    updateTodo(index);
  });
  
  let row = document.querySelector("#todos-" + index);
  row.innerHTML = "";
  
  let div = document.createElement("div");
  div.append(index + 1 + ". ");
  div.appendChild(input);
  div.style.textAlign = "center";
  
  row.appendChild(div);
  row.appendChild(btn);
} 

function updateTodo(index){
  const input = document.querySelector("#updateInput");
  const value = input.value.trim();
  todos[index].title = value;
  render();
  
  condition = false; // other buttons will work as to-do gets updated
}

// react
function render() {
  const container = document.getElementById("todos");
  container.innerHTML = "";

  todos.forEach((todo, i) => {
    const value = i + 1 + ". " + todo.title;
    addElement(value, i);
  });
}

// component
function addElement(value, count) {
  // used to add the given to-do in the list
  let todo = document.createElement("div");
  todo.id = "todos-" + count;
  todo.classList.add("todos"); // to add the property of the 'todos' class in this element

  let elm = document.createElement("div");
  elm.innerHTML = value; // or elm.appendChild(value)

  let btn = document.createElement("button");
  btn.classList.add("todos-btn");
  btn.textContent = "Delete";
  btn.addEventListener("click", function () {
    deleteTodo(count);
  });

  let edit = document.createElement("button");
  edit.classList.add("todos-btn");
  edit.textContent = "Edit";
  edit.addEventListener("click", function () {
    editTodo(count);
  });

  let btnContainer = document.createElement("div");
  btnContainer.appendChild(edit);
  btnContainer.appendChild(btn);

  todo.appendChild(elm);
  todo.appendChild(btnContainer);
  document.getElementById("todos").appendChild(todo);
}
