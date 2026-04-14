import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Layout.css';

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">
        <img src="/logo.svg" alt="Books Exchange Engine Logo" className="nav-logo" />
        <span>BookXchange</span>
      </Link>
      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/books" className="nav-link">Books</Link>
        
        {isAuthenticated ? (
          <>
            <Link to="/books/add" className="nav-link">Add Book</Link>
            <Link to="/my-books" className="nav-link">My Books</Link>
            <Link to="/exchange" className="nav-link">Exchanges</Link>
            <Link to="/profile" className="nav-link">Profile</Link>
            <button onClick={handleLogout} className="nav-btn" style={{ cursor: 'pointer', border: 'none' }}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="nav-btn">Login / Sign Up</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
