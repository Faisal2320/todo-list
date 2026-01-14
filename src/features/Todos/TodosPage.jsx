import { useEffect, useState } from "react";
import TodoList from "./TodoList/TodoList";
import TodoForm from "./TodoForm";
const baseUrl = import.meta.env.VITE_BASE_URL;

const TodosPage = ({ token }) => {
  const [todos, setTodos] = useState([]);
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${baseUrl}/tasks`, {
          method: "GET",
          headers: {
            "X-CSRF-Token": token,
          },
          credentials: "include",
        });
        if (!res.ok) {
          const data = await res.json();
          if (data.status === 401) {
            setApiError("Unauthorized access. Please log in.");
          }
          throw new Error(`Error fetching todos: ${res.statusText}`);
        }
        const data = await res.json();
        if (res.status === 200) {
          setTodos(data);
        }
      } catch (err) {
        setApiError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTodos();
  }, [token]);

  const completeTodo = async (id) => {
    const updatedTodos = todos.filter(Boolean).map((todo) => {
      return todo && todo.id === id ? { ...todo, isCompleted: true } : todo;
    });
    setTodos(updatedTodos);

    const checkedTodo = updatedTodos.find((todo) => todo && todo.id === id);

    try {
      const res = await fetch(`${baseUrl}/tasks/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          isCompleted: true,
          createdTime: checkedTodo.createdTime,
        }),
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": token,
        },
        credentials: "include",
      });

      if (!res.ok) {
        const revertedTodos = todos.map((todo) => {
          return todo.id === id ? { ...todo, isCompleted: false } : todo;
        });
        setTodos(revertedTodos);
        console.log(res);
        throw new Error(`Error completing todo: ${res.status}`);
      }
      if (res.status === 200) {
        const filteredTodos = updatedTodos.filter((todo) => todo.id !== id);
        setTodos(filteredTodos);
      }
    } catch (err) {
      setApiError(err.message);
    }
  };

  const addTodo = async (todoTitle) => {
    const newTodo = { id: Date.now(), title: todoTitle, isCompleted: false };
    setTodos((prev) => {
      return [newTodo, ...prev];
    });
    try {
      const res = await fetch(`${baseUrl}/tasks`, {
        method: "POST",
        body: JSON.stringify({
          title: todoTitle,
          isCompleted: false,
        }),
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": token,
        },
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error(`Error adding todo: ${res.status}`);
      }
      if (res.status === 201) {
        const data = await res.json();
        setTodos((prev) => {
          return prev.map((todo) => {
            // if (todo.id === data.id) {
            //   console.log("id equals");
            // }
            return todo.id === newTodo.id ? data : todo;
          });
        });
      }
    } catch (err) {
      setApiError(err.message);
    }
  };

  const updateTodo = async (todo) => {
    const preservedTodo = todos.find((t) => t && t.id === todo.id);
    const updatedTodos = todos.map((t) => {
      return t.id === todo.id ? todo : t;
    });
    setTodos(updatedTodos);
    try {
      const res = await fetch(`${baseUrl}/tasks/${todo.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: todo.title,
          isCompleted: todo.isCompleted,
          createdTime: todo.createdTime,
        }),
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": token,
        },
        credentials: "include",
      });

      if (!res.ok) {
        const revertedTodos = todos.map((t) => {
          return t.id === preservedTodo.id ? preservedTodo : t;
        });
        setTodos(revertedTodos);
        throw new Error(`Todo not updated : ${res.status}`);
      }
    } catch (err) {
      setApiError(err.message);
    }
  };

  return (
    <div className="todo-container">
      <h1>Add todos</h1>
      {apiError && <p className="error"> {apiError}</p>}
      <TodoForm funcAddTodo={addTodo} />
      {isLoading ? (
        <p>Loading todos...</p>
      ) : (
        <TodoList
          onUpdateTodo={updateTodo}
          onCompleteTodo={completeTodo}
          todos={todos}
        />
      )}
    </div>
  );
};

export default TodosPage;
