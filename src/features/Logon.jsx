import { useState } from "react";
const baseUrl = import.meta.env.VITE_BASE_URL;

// const Logon = ({ onSetEmail = () => {}, onSetToken = () => {} })
const Logon = ({ onSetEmail, onSetToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState(null);
  //   const [isLogon, setIsLogon] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // setting loading state
      setIsLoading(true);

      //   fetching data from backend
      const res = await fetch(`${baseUrl}/user/logon`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      });
      //   console.log(res.status);
      //    converting response to json
      if (!res.ok) {
        const data = await res.json();
        if (data.status === 401) {
          setAuthError("Invalid email or password. Please try again.");
        }
        throw new Error(`Error during authentication: ${data?.message}`);
      }
      const data = await res.json();

      if (res.status === 200 && data.name && data.csrfToken) {
        onSetEmail(data.name);
        onSetToken(data.csrfToken);
      } else {
        setAuthError(`Authentication failed: ${data?.message}`);
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

export default Logon;
