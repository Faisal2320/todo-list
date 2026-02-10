import { createContext, useContext, useState } from "react";
const baseUrl = import.meta.env.VITE_BASE_URL;

const AuthContext = createContext();
//
//
//
// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
//
//
//
// AuthProvider component to wrap around parts of the app that need auth state

export function AuthProvider({ children }) {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");

  //
  // login function
  const login = async (email, password) => {
    // Simulate an API call for authentication
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      };
      const res = await fetch(`${baseUrl}/user/logon`, options);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(`Error during authentication: ${data?.message}`);
      }

      if (res.status === 200 && data.name && data.csrfToken) {
        // successful login
        setEmail(data.name);
        setToken(data.csrfToken);
        return { success: true };
      } else {
        return { success: false, message: data.message || "Login failed" };
      }
    } catch (err) {
      return { success: false, error: err.message || "Login failed" };
    }
  };
  //
  // logout function
  const logout = async () => {
    if (!token) {
      setEmail("");
      setToken("");
    }
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": token,
      },
      credentials: "include",
    };
    const res = await fetch(`${baseUrl}/user/logoff`, options);
    setEmail("");
    setToken("");
    if (res.status === 200) {
      return { success: true };
    } else {
      return { success: false, message: "Logout failed" };
    }
  };
  const value = {
    email,
    token,
    isAuthenticated: !!token,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {/* children are passed down */}
      {children}
    </AuthContext.Provider>
  );
}
