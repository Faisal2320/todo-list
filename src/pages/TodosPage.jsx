import { useEffect } from "react";
import TodoList from "../features/Todos/TodoList/TodoList";
import TodoForm from "../features/Todos/TodoForm";
const baseUrl = import.meta.env.VITE_BASE_URL;
import SortBy from "../shared/SortBy";
import useDebounce from "../utils/useDebounce";
import FilterInput from "../shared/FilterInput";
import { useSearchParams } from "react-router";
import StatusFilter from "../shared/StatusFilter";
import { useReducer } from "react";
import {
  TODO_ACTIONS,
  initialState,
  todoReducer,
} from "../reducers/todoReducer";
import { useAuth } from "../contexts/AuthContext";
import loading from "../assets/img/loading.gif";
import sanitizeInput from "../utils/sanitizeInput";

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
  const [searchParams] = useSearchParams(); // Add this line
  const statusFilter = searchParams.get("status") || "all";

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
        let action = debouncedFilterTerm ? "No Todo Found" : err.message;
        dispatch({
          type: debouncedFilterTerm
            ? TODO_ACTIONS.SET_FILTER_ERROR
            : TODO_ACTIONS.FETCH_ERROR,
          payload: action,
        });
      } finally {
        // setIsLoading(false);
      }
    };
    fetchTodos();
  }, [token, sortBy, sortDirection, debouncedFilterTerm, searchParams]);

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
          isCompleted: !checkedTodo.isCompleted,
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
    const newTodo = {
      id: Date.now(),
      title: todoTitle,
      isCompleted: false,
    };
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
        if (res.status == 429) {
          throw new Error(`Reached Max todos ${res.status}: `);
        } else {
          throw new Error(`Error adding todo: ${res.status}`);
        }
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
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Add Todos</h1>

      {/* API Error */}
      {apiError && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md flex items-start justify-between">
          <p className="text-sm">{apiError}</p>
          <button
            onClick={() =>
              dispatch({ type: TODO_ACTIONS.FETCH_ERROR, payload: "" })
            }
            className="ml-4 text-red-600 hover:text-red-800 font-medium"
          >
            Clear
          </button>
        </div>
      )}

      {/* Filter Error */}
      {filterError && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 p-4 rounded-md space-y-3">
          <p className="text-sm">{filterError}</p>

          <div className="flex gap-3">
            <button
              onClick={() => dispatch({ type: TODO_ACTIONS.RESET_FILTER })}
              className="btn btn-secondary"
            >
              Clear Filter Error
            </button>

            <button
              onClick={() => dispatch({ type: TODO_ACTIONS.RESET_FILTER })}
              className="btn btn-primary"
            >
              Reset Filter
            </button>
          </div>
        </div>
      )}

      {/* Sorting + Filtering */}
      <div className="card p-6">
        <h2 className="heading-2 mb-4">Manage Todos</h2>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <SortBy
            sortBy={sortBy}
            sortDirection={sortDirection}
            onSortByChange={onSortByChange}
            onSortDirectionChange={onSortDirectionChange}
          />
          <StatusFilter />
        </div>
        <div>
          <FilterInput
            filterTerm={filterTerm}
            onFilterTerm={handleFilterTerm}
          />
        </div>
      </div>

      {/* Add Todo Form */}
      <TodoForm funcAddTodo={addTodo} />

      {/* Loading State */}
      <div className="relative">
        {isLoading ? (
          <img
            className=" absolute w-80 -top-50 left-30 z-10 opacity-50"
            src={loading}
          />
        ) : (
          <TodoList
            statusFilter={statusFilter}
            dataVersion={dataVersion}
            onUpdateTodo={updateTodo}
            onCompleteTodo={completeTodo}
            todos={todos}
          />
        )}
      </div>
    </div>
  );
};

export default TodosPage;
