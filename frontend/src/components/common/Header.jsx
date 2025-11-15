import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">Portfolio</Link>
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/projects">Projects</Link>
          {user ? (
            <>
              <Link to="/admin">Admin</Link>
              <button onClick={handleLogout} className="btn-logout">Logout</button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;