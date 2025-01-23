const { Command } = require("commander");
// const crypto = require("crypto");
const library = require("./library");

// Todo server
// 1. add a todo
// 2. delete a todo
// 3. mark a todo as done
// 4. update a todo
// 5. get the todo list
// 6. delete all todos

// Todo list data structure
// id, description, flag (to mark as done)

const filepath = "todolist.json";
library.setPath(filepath);
let counter = 1;

// for creating a custom cli
function createCli() {
  const program = new Command();

  program
    .option("-a, --add <type...>", "Add a todo.") // `...` used for taking multiple arguments for this flag
    .option("-d, --delete <type>", "Delete a todo.") // expect the todo name
    .option("-u, --update <type...>", "Update a todo.") // expect older and newer todo
    .option("-m, --mark <type>", "Mark a todo as done.") // expect the todo name
    .option("-p, --print", "Print all todos.")
    .option("-x, --deleteAll", "Delete all todos.")
    .parse(process.argv);

  const options = program.opts();

  if (options.add) {
    addTodo(options.add);
  }

  if (options.delete) {
    deleteTodo(options.delete);
  }

  if (options.update) {
    updateTodo(options.update);
  }

  if (options.mark) {
    markTodo(options.mark);
  }

  if (options.print) {
    printTodo();
  }

  if (options.deleteAll) {
    deleteAll();
  }
}

// trying to make the hash of the todo-string as ID.
// const hash = crypto.createHash("sha256").update(input).digest("hex");

// add a todo : input -> todo description
function addTodo(todos) {
  for (let i = 0; i < todos.length; i++) {
    const description = todos[i].trim();

    if (description.length == 0) {
      console.error("Invalid input. Description must not be an empty string.");
      process.exit(1);
    }

    const todo = {
      id: counter++,
      description: description,
      flag: false, // false by default
    };

    let isPresent = library.isPresent(todo);
    if (isPresent == -1) {
      library.appendData(todo);
      console.log("Todos added successfully!");
    } else {
      console.log(`${todos[i]} already present at index ${isPresent}.`);
    }
  }
}

// input -> string (todo to delete)
function deleteTodo(todo) {
  let todos = library.readFileAsObject();
  const index = library.isPresentString(todo);
  if (index == -1) {
    console.log("Already deleted or not present.");
  } else {
    todos.splice(index, 1);
    console.log("Todo is deleted successfully.");
    library.writeData(todos);
  }
}

// input -> older todo and the new one.
function updateTodo(todo) {
  let todos = library.readFileAsObject();
  const index = library.isPresentString(todo[0]);
  if (index == -1) {
    console.log(
      "This todo is not present. But we have added this in your todo-list."
    );
    addTodo(todo[1]);
  } else {
    todos[index].description = todo[1];
    console.log("Todo updated successfully.");
    library.writeData(todos);
  }
}

// input -> todo name
function markTodo(todo) {
  let todos = library.readFileAsObject();
  const index = library.isPresentString(todo);
  if (index == -1) {
    console.log("Todo is not present.");
  } else {
    todos[index].flag = true;
    console.log(`${todo} marked as done successfully.`);
    library.writeData(todos);
  }
}

// print the todo-list
function printTodo() {
  const data = library.readFileAsObject();
  if (data.length == 0)
    console.log("No todo to display. Try adding some todos first.");
  else console.log(data);
}

// delete all todos
function deleteAll() {
  let arr = [];
  library.writeData(arr);
  console.log("All todos are deleted successfully.");
}

createCli();
