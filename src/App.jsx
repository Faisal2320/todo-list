import "./App.css";

import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import TodosPage from "./pages/TodosPage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
import RequireAuth from "./components/RequireAuth";
import Header from "./shared/Header";
import Logoff from "./features/Logoff";

function App() {
  // const { isAuthenticated, email } = useAuth();

  return (
    <div className="min-h-screen w-9/10 mx-auto flex flex-col bg-gray-50 text-gray-800">
      <Header />
      {/* App Routes */}
      <main className="flex-1 container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logoff" element={<Logoff />} />
          <Route
            path="/todos"
            element={
              <RequireAuth>
                <TodosPage />
              </RequireAuth>
            }
          />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <ProfilePage />
              </RequireAuth>
            }
          />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
