const { Command } = require("commander");
const fs = require("fs");

let todos = [];

function getPath() {
  const program = new Command();
  program.option("-p, --path <type>", "File path");
  program.option("-a, --add <type>", "Add a ToDo");
  program.option("-u, --update <type>", "Update a ToDo");
  program.option("-d, --delete <type>", "Delete a ToDo");
  program.option("-f, --fetch", "Fetch the ToDos"); // no args needed here
  program.parse(process.argv);

  const options = program.opts();
  console.log("Options: " + options);

  if (options.path) {
    countWords(options.path);
  }

  if (options.add) {
    addTodo(options.add);
  }

  if (options.update) {
    updateTodo(options.update);
  }

  if (options.delete) {
    deleteTodo(options.delete);
  }

  if (options.fetch) {
    fetchTodo();
  }
}

// will count number of words in the given file
function countWords(path) {
  console.log(`Path given : ${path}`);
  const content = fs.readFileSync(`${path}`, "utf-8");
  console.log("File Content: " + content);
  content.trim();
  console.log(`You have ${content.split(" ").length} words in file ${path}.`);
}

// will add todo
function addTodo(todo) {
  let id = todos.length;
  
  todos.push({
    id: todos.length,
    name: todo,
  });
  
  console.log(todos[id].name);
  console.log(todo + " is added.");
}

// will update the selected todo
function updateTodo(todo) {}

// will delete the selected todo
function deleteTodo(todo) {}

// will fetch and display all todos
function fetchTodo() {
  if (todos.length === 0) {
    console.log("No todos available.");
    return;
  }

  todos.forEach((todo) => {
    const id = todo.id !== undefined ? todo.id : "Unknown ID";
    const name = todo.name || "Unnamed Todo";
    console.log("ID: " + id + ", Todo: " + name);
  });
}


getPath();
