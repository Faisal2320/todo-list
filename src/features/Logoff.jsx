import { useAuth } from "../contexts/AuthContext";
const Logoff = () => {
  const { isAuthenticated, logout } = useAuth();

  return isAuthenticated ? <button onClick={logout}>Log Off</button> : null;
};

export default Logoff;
