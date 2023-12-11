import { Link } from "react-router-dom";

const NavBar = () => {

  return (
    <nav className="navbar">
        <Link to="/">
            <button className="navbar-button">Home</button>
        </Link>
    </nav>
  );
};

export default NavBar;
