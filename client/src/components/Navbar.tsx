import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarusers"
          aria-controls="navbarusers"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <Link to="/" className="navbar-brand">
          Users
        </Link>
        <div className="collapse navbar-collapse" id="navbarusers">
          <ul className="navbar-nav ms-auto mb-lg-0">
            <li className="nav-item">
              <NavLink exact to="/" className="nav-link">
                Users
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink exact to="/manage" className="nav-link">
                Manage Users
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
