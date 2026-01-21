import "./App.css";
import { useState } from "react";
import TodosPage from "./features/Todos/TodosPage";
import Header from "./shared/Header";
import Logon from "./features/Logon";

function App() {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState(null);

  return (
    <header className="header">
      <Header token={token} onSetToken={setToken} onSetEmail={setEmail} />
      {token && <p>Welcome, {email}!</p>}
      {token ? (
        <TodosPage token={token} />
      ) : (
        <Logon onSetEmail={setEmail} onSetToken={setToken} />
      )}
    </header>
  );
}

export default App;
