const fs = require("fs");
const { Command } = require("commander");

const todosFilePath = "todos.json";

// Ensure file exists
if (!fs.existsSync(todosFilePath)) {
  fs.writeFileSync(todosFilePath, "[]", { flag: "w" }); // Initialize with an empty array
}

// Load todos from file
function loadTodos() {
  if (fs.existsSync(todosFilePath)) {
    const data = fs.readFileSync(todosFilePath, "utf-8").trim();
    if (data) {
      return JSON.parse(data);
    }
  }
  return [];
}

// Save todos to file
function saveTodos(todos) {
  console.log(todos);
  fs.writeFileSync(todosFilePath, JSON.stringify(todos, null, 2), {
    // writing todos in the file
    flag: "w",
  });
}

// Initialize todos array
let todos = loadTodos();
console.log("todos : " + todos[1].name);

function getPath() {
  const program = new Command();
  program.name("ToDo CLI").description("CLI to manage todos").version("1.0.0");

  program.option("-a, --add <type>", "Add a ToDo");
  program.option("-u, --update <type>", "Update a ToDo by ID and new name");
  program.option("-d, --delete <type>", "Delete a ToDo by ID");
  program.option("-f, --fetch", "Fetch all ToDos");

  program.parse(process.argv);

  const options = program.opts();

  if (options.add) {
    addTodo(options.add);
  } else if (options.update) {
    const [id, newName] = options.update.split(",");
    updateTodo(id, newName);
  } else if (options.delete) {
    deleteTodo(options.delete);
  } else if (options.fetch) {
    fetchTodos();
  } else {
    console.log(
      "Please provide a valid command. Use --help for more information."
    );
  }
}

function addTodo(todo) {
  todos.push({ id: todos.length + 1, name: todo });
  saveTodos(todos);
  console.log(`Added ToDo: "${todo}"`);
}

function updateTodo(id, newName) {
  const todo = todos.find((t) => t.id === parseInt(id, 10));
  if (todo) {
    todo.name = newName;
    saveTodos(todos);
    console.log(`Updated ToDo ID ${id}: "${newName}"`);
  } else {
    console.log("ToDo not found.");
  }
}

function deleteTodo(id) {
  const index = todos.findIndex((t) => t.id === parseInt(id, 10));
  if (index !== -1) {
    todos.splice(index, 1);
    saveTodos(todos);
    console.log(`Deleted ToDo ID ${id}`);
  } else {
    console.log("ToDo not found.");
  }
}

function fetchTodos() {
  if (todos.length === 0) {
    console.log("No ToDos available.");
  } else {
    todos.forEach((todo) => console.log(`${todo.id}. ${todo.name}`));
  }
}

getPath();
