const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li className="navbar-link">
          <a className="home-link" href="/">Home</a>
          <a className="topics-link" href="/topics">Topics</a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
