import { useState } from "react";

type TodoType = {
  s_no: number;
  todo: string;
};

const todoArr = ["Go to gym", "Go to class", "Drink water", "Eat Breakfast"];
const buttonStyle = {
  padding: "10px 15px",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  marginBottom: "20px",
  margin: "5px",
};

function App() {
  const [todos, setTodos] = useState<TodoType[]>([]);

  function addTodos(): void {
    setTodos((prev) => [
      ...prev,
      {
        s_no: prev.length + 1,
        todo: todoArr[Math.floor(Math.random() * todoArr.length)],
      },
    ]);
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <button onClick={addTodos} style={buttonStyle}>
        Add A Random Todo
      </button>

      <button
        onClick={() => {
          setTodos([]);
        }}
        style={buttonStyle}
      >
        Clear Todo
      </button>
      {todos.map((t) => (
        <Todo key={t.s_no} {...t} />
      ))}
    </div>
  );
}

// Todo component
function Todo({ s_no, todo }: TodoType) {
  return (
    <div
      style={{
        padding: "10px",
        marginBottom: "8px",
        backgroundColor: "#f1f1f1",
        borderRadius: "4px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      }}
    >
      {s_no}. {todo}
    </div>
  );
}

export default App;
