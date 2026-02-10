import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/todos", { replace: true });
    } else {
      navigate("login", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return <></>;
};

export default HomePage;
