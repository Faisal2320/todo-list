import TodoList from "./features/TodoList/TodoList";
import TodoForm from "./features/TodoForm";
import { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);

  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        // if(todo.isCompleted){
        //   return {...todo, isCompleted:false}
        // }
        return { ...todo, isCompleted: true };
      } else {
        return todo;
      }
    });
    setTodos(updatedTodos);
  };

  const addTodo = (todoTitle) => {
    setTodos((prev) => {
      return [
        { id: Date.now(), title: todoTitle, isCompleted: false },
        ...prev,
      ];
    });
  };

  const updateTodo = (todo) => {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        return todo;
      }
      return t;
    });
    setTodos(updatedTodos);
  };
  return (
    <div className="todo-container">
      <h1>My todos</h1>
      <TodoForm funcAddTodo={addTodo} />
      <TodoList
        onUpdateTodo={updateTodo}
        onCompleteTodo={completeTodo}
        todos={todos}
      />
    </div>
  );
}

export default App;
