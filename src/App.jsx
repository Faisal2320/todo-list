import TodoList from "./TodoList";
import TodoForm from "./TodoForm";
import { useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  function addTodo(todoTitle) {
    setTodos((prev) => {
      return [todoTitle, ...prev];
    });
  }
  return (
    <div className="">
      <h1>My todos</h1>
      <TodoForm funcAddTodo={addTodo} />
      <TodoList todos={todos} />
    </div>
  );
}

export default App;
