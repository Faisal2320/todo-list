// src/pages/ProfilePage.jsx

import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useReducer } from "react";
const baseUrl = import.meta.env.VITE_BASE_URL;
import {
  TODO_ACTIONS,
  initialState,
  todoReducer,
} from "../reducers/todoReducer";

const ProfilePage = () => {
  const [{ todos, apiError, isLoading }, dispatch] = useReducer(
    todoReducer,
    initialState,
  );
  const { email, token } = useAuth();
  const [todoStatistics, setTodoStatics] = useState({
    all: 0,
    completed: 0,
    pending: 0,
  });

  useEffect(() => {
    const fetchTodos = async () => {
      if (!token) return;
      try {
        dispatch({ type: TODO_ACTIONS.FETCH_START });
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
          let completed = 0;
          let pending = 0;
          data.forEach((t) => {
            if (t.isCompleted == true) {
              completed += 1;
            } else {
              pending += 1;
            }
          });
          setTodoStatics((prev) => {
            return {
              ...prev,
              all: data.length,
              completed,
              pending,
            };
          });
        }
      } catch (err) {
        dispatch({ type: TODO_ACTIONS.FETCH_ERROR, payload: err.message });
      } finally {
        //
      }
    };
    fetchTodos();
  }, [token]);
  return (
    <div className="profile-page">
      <h1>User Profile</h1>

      <section>
        <h2>User Information: {email}</h2>
      </section>

      <section>
        <h2>Todo Statistics</h2>

        {isLoading && <p>Loading statistics...</p>}
        {apiError && <p className="error">{apiError}</p>}

        {!isLoading && !apiError && (
          <ul>
            <li>
              <strong>Total Todos:</strong> {todoStatistics.all}
            </li>
            <li>
              <strong>Completed:</strong> {todoStatistics.completed}
            </li>
            <li>
              <strong>Active:</strong> {todoStatistics.pending}
            </li>
          </ul>
        )}
      </section>
    </div>
  );
};

export default ProfilePage;
