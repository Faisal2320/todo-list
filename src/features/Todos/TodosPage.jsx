import { useCallback, useEffect, useState } from "react";
import TodoList from "./TodoList/TodoList";
import TodoForm from "./TodoForm";
const baseUrl = import.meta.env.VITE_BASE_URL;
import SortBy from "../../shared/SortBy";
import useDebounce from "../../utils/useDebounce";
import FilterInput from "../../shared/FilterInput";

const TodosPage = ({ token }) => {
  const [todos, setTodos] = useState([]);
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState("createdDate");
  const [sortDirection, setSortDirection] = useState("desc");
  const [filterTerm, setFilterTerm] = useState("");
  const debouncedFilterTerm = useDebounce(filterTerm, 300);
  const [dataVersion, setDataVersion] = useState(0);
  const [filterError, setFilterError] = useState("");

  useEffect(() => {
    const paramsObject = {
      sortBy,
      sortDirection,
    };
    if (debouncedFilterTerm) {
      paramsObject.find = debouncedFilterTerm;
    }
    const params = new URLSearchParams(paramsObject);

    const fetchTodos = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${baseUrl}/tasks?${params}`, {
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
          setFilterError("");
        }
      } catch (err) {
        if (
          debouncedFilterTerm ||
          sortBy !== "createdAt" ||
          sortDirection !== "desc"
        ) {
          setFilterError(`Error filtering/ sorting todos: ${err.message}`);
        } else {
          setApiError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchTodos();
  }, [token, sortBy, sortDirection, debouncedFilterTerm]);

  const handleFilterTerm = (term) => {
    setFilterTerm(term);
  };

  const invalidateCache = useCallback(() => {
    setDataVersion((prev) => prev + 1);
  }, []);

  const completeTodo = async (id) => {
    const updatedTodos = todos.filter(Boolean).map((todo) => {
      return todo && todo.id === id ? { ...todo, isCompleted: true } : todo;
    });

    const checkedTodo = updatedTodos.find((todo) => todo && todo.id === id);
    setTodos(updatedTodos);

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
        throw new Error(`Error completing todo: ${res.status}`);
      }
      if (res.status === 200) {
        const filteredTodos = updatedTodos.filter((todo) => todo.id !== id);
        setTodos(filteredTodos);
        invalidateCache();
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
            return todo.id === newTodo.id ? data : todo;
          });
        });
        invalidateCache();
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
    invalidateCache();
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
      if (res.status === 200) {
        let data = await res.json();
        setTodos((prev) => {
          return prev.map((t) => (t.id === data.id ? data : t));
        });
        invalidateCache();
      }
    } catch (err) {
      setApiError(err.message);
    }
  };

  return (
    <div className="todo-container">
      <h1>Add todos</h1>
      {apiError && <p className="error"> {apiError}</p>}
      {filterError && (
        <div>
          <p className="error"> {filterError}</p>
          <button onClick={() => setFilterError("")}>Clear Filter Error</button>
          <button
            onClick={() => {
              setFilterTerm("");
              setSortBy("createdAt");
              setSortDirection("desc");
              setFilterError("");
            }}
          >
            Reset Filter
          </button>
        </div>
      )}
      <SortBy
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSortByChange={setSortBy}
        onSortDirectionChange={setSortDirection}
      />
      <FilterInput filterTerm={filterTerm} onFilterTerm={handleFilterTerm} />
      <TodoForm funcAddTodo={addTodo} />
      {isLoading ? (
        <p>Loading todos...</p>
      ) : (
        <>
          <TodoList
            dataVersion={dataVersion}
            onUpdateTodo={updateTodo}
            onCompleteTodo={completeTodo}
            todos={todos}
          />
        </>
      )}
    </div>
  );
};

export default TodosPage;
