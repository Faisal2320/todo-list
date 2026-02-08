import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
const Logoff = () => {
  const navigate = useNavigate();
  const { logout, isAuthenticated } = useAuth();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return isAuthenticated ? (
    <button onClick={handleLogout}>Log Out</button>
  ) : null;
};

export default Logoff;
