async function addTodo() {
  const todo = document.getElementById("todo").value;
  const token = localStorage.getItem("token");

  if (!todo) {
    alert("Please enter your todo first.");
    return;
  }
  try {
    const response = await axios.post(
      "http://localhost:3000/add-todo",
      { todo },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    alert(response.data.msg);
    render(response.data.todos);
  } catch (error) {
    alert(error.response?.data?.msg || "Something went wrong.");
  }
}

function render(todos) {
  const todosDiv = document.getElementById("todos");
  todosDiv.innerHTML = "";

  todos.forEach((todo, index) => {
    // Create a div for each todo item
    const text = document.createElement("div");
    text.innerHTML = `${index + 1}. ${todo.todo} - ${
      todo.completed ? "✅ Done" : "⏳ Pending"
    }`;

    // Mark as Done button
    const doneBtn = document.createElement("button");
    doneBtn.textContent = "Mark as Done";
    doneBtn.onclick = () => markAsDone(index);

    // Update Todo button
    const updateBtn = document.createElement("button");
    updateBtn.textContent = "Update Todo";
    updateBtn.onclick = () => updateTodo(index);

    // Delete Todo button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => deleteTodo(index);

    // Append elements to the main container
    const todoItem = document.createElement("div");
    todoItem.appendChild(text);
    todoItem.appendChild(doneBtn);
    todoItem.appendChild(updateBtn);
    todoItem.appendChild(deleteBtn);
    todosDiv.appendChild(todoItem);
  });
}
