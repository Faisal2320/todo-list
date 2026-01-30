import { useEffect } from "react";
import TodoList from "./TodoList/TodoList";
import TodoForm from "./TodoForm";
const baseUrl = import.meta.env.VITE_BASE_URL;
import SortBy from "../../shared/SortBy";
import useDebounce from "../../utils/useDebounce";
import FilterInput from "../../shared/FilterInput";
import { useReducer } from "react";
import {
  TODO_ACTIONS,
  initialState,
  todoReducer,
} from "../../reducers/todoReducer";
import { useAuth } from "../../contexts/AuthContext";

const TodosPage = () => {
  const [
    {
      todos,
      apiError,
      isLoading,
      sortBy,
      sortDirection,
      filterTerm,
      filterError,
      dataVersion,
    },
    dispatch,
  ] = useReducer(todoReducer, initialState);

  const debouncedFilterTerm = useDebounce(filterTerm, 300);
  const { token } = useAuth();

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
        // setIsLoading(true);
        dispatch({ type: TODO_ACTIONS.FETCH_START });

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
            // setApiError("Unauthorized access. Please log in.");
            dispatch({
              type: TODO_ACTIONS.FETCH_ERROR,
              payload: "Unauthorized access. Please log in.",
            });
          }
          throw new Error(`Error fetching todos: ${res.statusText}`);
        }
        const data = await res.json();
        if (res.status === 200) {
          dispatch({ type: TODO_ACTIONS.FETCH_SUCCESS, payload: data });
        }
      } catch (err) {
        if (debouncedFilterTerm) {
          dispatch({
            type: TODO_ACTIONS.SET_FILTER_ERROR,
            payload: `Error filtering/ sorting todos: ${err.message}`,
          });
        } else {
          dispatch({
            type: TODO_ACTIONS.FETCH_ERROR,
            payload: err.message,
          });
        }
      } finally {
        // setIsLoading(false);
      }
    };
    fetchTodos();
  }, [token, sortBy, sortDirection, debouncedFilterTerm]);

  const handleFilterTerm = (term) => {
    dispatch({ type: TODO_ACTIONS.SET_FILTER, payload: term });
  };

  // const invalidateCache = useCallback(() => {
  //   dispatch({ type: TODO_ACTIONS.RESET_FILTER });
  // }, []);

  const completeTodo = async (id) => {
    dispatch({
      type: TODO_ACTIONS.COMPLETE_TODO_START,
      payload: { id: id },
    });

    const checkedTodo = todos.find((todo) => todo && todo.id === id);
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
        dispatch({
          type: TODO_ACTIONS.COMPLETE_TODO_ERROR,
          payload: {
            id: id,
            error: `Error completing todo: ${res.status}`,
          },
        });

        throw new Error(`Error completing todo: ${res.status}`);
      }
      if (res.status === 200) {
        dispatch({
          type: TODO_ACTIONS.COMPLETE_TODO_SUCCESS,
          payload: { id: id },
        });
      }
    } catch (err) {
      dispatch({
        type: TODO_ACTIONS.COMPLETE_TODO_ERROR,
        payload: {
          id: id,
          error: `Error completing todo: ${err.message}`,
        },
      });
    }
  };

  const addTodo = async (todoTitle) => {
    const newTodo = { id: Date.now(), title: todoTitle, isCompleted: false };
    dispatch({ type: TODO_ACTIONS.ADD_TODO_START, payload: newTodo });
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
        // setTodos((prev) => {
        //   return prev.map((todo) => {
        //     return todo.id === newTodo.id ? data : todo;
        //   });
        // });
        // invalidateCache();
        dispatch({ type: TODO_ACTIONS.ADD_TODO_SUCCESS, payload: data });
      }
    } catch (err) {
      dispatch({ type: TODO_ACTIONS.ADD_TODO_ERROR, payload: err.message });
    }
  };

  const updateTodo = async (todo) => {
    const preservedTodo = todos.find((t) => t && t.id === todo.id);
    dispatch({ type: TODO_ACTIONS.UPDATE_TODO_START, payload: todo });
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
        throw new Error(`Todo not updated : ${res.status}`);
      }
      if (res.status === 200) {
        let data = await res.json();
        dispatch({ type: TODO_ACTIONS.UPDATE_TODO_SUCCESS, payload: data });
      }
    } catch (err) {
      dispatch({
        type: TODO_ACTIONS.UPDATE_TODO_ERROR,
        payload: {
          todo: preservedTodo,
          error: err.message,
        },
      });
    }
  };

  const onSortByChange = (sortBy) => {
    dispatch({ type: TODO_ACTIONS.SET_SORT, payload: sortBy });
  };
  const onSortDirectionChange = (sortDir) => {
    dispatch({
      type: TODO_ACTIONS.SET_SORT_DIRECTION,
      payload: sortDir,
    });
  };

  return (
    <div className="todo-container">
      <h1>Add todos</h1>
      {apiError && (
        <p className="error">
          {" "}
          {apiError}
          <button
            onClick={() =>
              dispatch({ type: TODO_ACTIONS.FETCH_ERROR, payload: "" })
            }
          >
            Clear
          </button>
        </p>
      )}
      {filterError && (
        <div>
          <p className="error"> {filterError}</p>
          <button onClick={() => dispatch({ type: TODO_ACTIONS.RESET_FILTER })}>
            Clear Filter Error
          </button>
          <button
            onClick={() => {
              dispatch({ type: TODO_ACTIONS.RESET_FILTER });
            }}
          >
            Reset Filter
          </button>
        </div>
      )}
      <SortBy
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSortByChange={onSortByChange}
        onSortDirectionChange={onSortDirectionChange}
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
