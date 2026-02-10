// src/pages/ProfilePage.jsx

import { useEffect, useState, useReducer } from "react";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import {
  TODO_ACTIONS,
  initialState,
  todoReducer,
} from "../reducers/todoReducer";

const baseUrl = import.meta.env.VITE_BASE_URL;

const ProfilePage = () => {
  const [{ apiError, isLoading }, dispatch] = useReducer(
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
            t.isCompleted ? completed++ : pending++;
          });

          setTodoStatics({
            all: data.length,
            completed,
            pending,
          });
        }
      } catch (err) {
        dispatch({ type: TODO_ACTIONS.FETCH_ERROR, payload: err.message });
      }
    };

    fetchTodos();
  }, [token]);

  return (
    <div className="page-container">
      {/* Page Title */}
      <h1 className="heading-1 mb-22">User Profile</h1>

      {/* User Info */}
      <section className="section card">
        <FaUser className="text-primary text-4xl inline-block" />

        <p className=" pl-4 body-text inline-block">
          <strong>Name:</strong> {email}
        </p>
      </section>

      {/* Todo Statistics */}
      <section className="section card pl-15">
        <h2 className="heading-2">Todo Statistics</h2>

        {isLoading && (
          <p className="text-gray-600 animate-pulse">Loading statistics...</p>
        )}

        {apiError && <div className="alert-error">{apiError}</div>}

        {!isLoading && !apiError && (
          <ul className="space-y-2 text-gray-700">
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
