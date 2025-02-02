import React, { useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import AuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom';
import './style/style.css'
function Navbar() {
  const { user, logoutUser } = useContext(AuthContext);
  const token = localStorage.getItem('authTokens');

  if (token) {
    const decoded = jwtDecode(token);
    var user_id = decoded.user_id;
  }

  return (
    <div>
      <nav className="navbar navbar-expand-md ">
        <div className="container-fluid">
        <div className="ms-auto">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          </div>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto justify-content-end">
            
              {token === null && (
                <>
                  <li className="nav-item ">
                    <Link className="nav-link " to="/login">
                      <i className="fas fa-sign-in-alt"></i> Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      <i className="fas fa-user-plus"></i> Register
                    </Link>
                  </li>
                </>
              )}
              {token !== null && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/inbox">
                      <i className="fas fa-envelope"></i> Inbox
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      onClick={logoutUser}
                      style={{ cursor: 'pointer' }}
                    >
                      <i className="fas fa-sign-out-alt"></i>Logout
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;