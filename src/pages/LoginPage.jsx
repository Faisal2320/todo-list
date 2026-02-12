import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useLocation, useNavigate } from "react-router";
import loading from "../assets/img/loading.gif";
import sanitizeInput from "../utils/sanitizeInput";
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
      // purifying the email and password for
      const result = await login(sanitizeInput(email), sanitizeInput(password));

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
    <div className="logon relative w-8/10 md:w-5/10 mx-auto ">
      <h1 className="text-center font-bold">Logon Page</h1>
      {authError && <p className="text-red-600 text-sm mt-1">{authError}</p>}
      <form action="POST" onSubmit={handleSubmit}>
        <div className="form-group ">
          <label className="form-label" htmlFor="email">
            Email:
          </label>

          <input
            className="input"
            id="email"
            type="text"
            value={email}
            placeholder="Username or Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="password">
            Password:
          </label>
          <input
            className="input"
            id="password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
        </div>
        <button
          className="btn btn-primary px-8 py-2 border border-gray-900 bg-gray-800 text-white shadow-md hover:shadow-gray-500"
          type="submit"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
      {isLoading && (
        <img
          className=" absolute bottom-0 left-1/2 z-10 opacity-50 w-20 transform -translate-x-1/2"
          src={loading}
        />
      )}
    </div>
  );
};

export default LoginPage;
