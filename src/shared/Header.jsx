import Logoff from "../features/logoff";
import Navigation from "./Navigation";
const Header = () => {
  return (
    <header className="header">
      <Navigation />
      <Logoff />
    </header>
  );
};

export default Header;
