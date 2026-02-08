import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useLocation, useNavigate } from "react-router";

// const Logon = ({ onSetEmail = () => {}, onSetToken = () => {} })
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  //
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // setting loading state
      setIsLoading(true);

      //   fetching data from backend
      const result = await login(email, password);

      if (result.success) {
        setAuthError(null);
      } else {
        setAuthError(result.message || "Logon failed");
      }
    } catch (err) {
      setAuthError(`Authentication failed (${err.name}): ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="logon">
      <h1>Logon Page</h1>
      {authError && <p className="error">{authError}</p>}
      <form action="POST" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
        </div>
        <button type="submit" onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Logging in..." : "Logon"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
