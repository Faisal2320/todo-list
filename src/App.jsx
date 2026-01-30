import "./App.css";
import TodosPage from "./features/Todos/TodosPage";
import Header from "./shared/Header";
import Logon from "./features/Logon";
import { useAuth } from "./contexts/AuthContext";

function App() {
  const { isAuthenticated, email } = useAuth();

  return (
    <header className="header">
      <Header />
      {isAuthenticated && <p>Welcome, {email}!</p>}
      {isAuthenticated ? <TodosPage /> : <Logon />}
    </header>
  );
}

export default App;
