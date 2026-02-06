import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <Link to="/">🏠 Home</Link>
        </li>
        <li>
          <Link to="/todos">📝 Todos</Link>
        </li>
        <li>
          <Link to="/posts">📰 Posts</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;