import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import './Pages.css';

const NotFoundPage = () => {
  return (
    <>
      <Navbar />
      <div className="page-content" style={{ background: '#f8fafc' }}>
        <div className="not-found-container">
          <h1 style={{ fontSize: '6rem', margin: 0, color: '#1e1b4b', fontWeight: '800' }}>404</h1>
          <h2 style={{ fontSize: '2rem', margin: '0 0 2rem 0', color: '#64748b' }}>Page Not Found</h2>
          <p style={{ color: '#475569', marginBottom: '3rem', fontSize: '1.1rem' }}>
            Oops! The page you are looking for doesn't exist or has been moved.
          </p>
          <Link to="/" className="btn-primary">
            Return Home
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFoundPage;
