import { NavLink } from "react-router";
// import Logoff from "../features/Logoff.jsx";
import Logoff from "../features/Logoff";
import { useAuth } from "../contexts/AuthContext";
export default function Navigation() {
  const { isAuthenticated } = useAuth();

  const linkClasses = ({ isActive }) =>
    [
      "px-3 py-2 rounded-md text-sm font-medium transition-colors",
      isActive
        ? "text-primary font-semibold bg-primary/10"
        : "text-gray-700 hover:text-primary hover:bg-gray-100",
    ].join(" ");

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky">
      <div className="max-w-5xl mx-auto px-4">
        <ul className="flex items-center gap-6 py-4">
          {/* Left side links */}
          <li>
            <NavLink to="/about" className={linkClasses}>
              About
            </NavLink>
          </li>

          {isAuthenticated ? (
            <>
              <li>
                <NavLink to="/todos" className={linkClasses}>
                  Todos
                </NavLink>
              </li>

              <li>
                <NavLink to="/profile" className={linkClasses}>
                  Profile
                </NavLink>
              </li>
              <li>
                <span className={linkClasses}>
                  <Logoff />
                </span>
              </li>
            </>
          ) : (
            <li>
              <NavLink to="/login" className={linkClasses}>
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
