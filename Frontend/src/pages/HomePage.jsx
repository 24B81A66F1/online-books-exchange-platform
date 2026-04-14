import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import './Pages.css';

const HomePage = () => {
  return (
    <>
      <Navbar />
      <div className="page-content">
        <section className="hero-section">
          <h1 className="hero-title">
            Swap the stories you've finished.<br />
            <span>Discover the ones you haven't.</span>
          </h1>
          <p className="hero-subtitle">
            Join the ultimate online community for book lovers. Trade in your read books and get new adventures delivered straight to your door.
          </p>
          <div className="hero-buttons">
            <Link to="/books" className="btn-primary">Browse Books</Link>
            <Link to="/register" className="btn-secondary">Join for Free</Link>
          </div>
        </section>

        <section className="page-container" style={{ textAlign: 'center', paddingBottom: '6rem' }}>
          <h2 className="section-title">How It Works</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
            <div style={{ padding: '2rem', background: '#f8fafc', borderRadius: '16px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📚</div>
              <h3 style={{ fontSize: '1.5rem', color: '#1e293b' }}>1. List a Book</h3>
              <p style={{ color: '#64748b' }}>Post a picture of your book and add details like condition and genre.</p>
            </div>
            <div style={{ padding: '2rem', background: '#f8fafc', borderRadius: '16px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
              <h3 style={{ fontSize: '1.5rem', color: '#1e293b' }}>2. Find a Match</h3>
              <p style={{ color: '#64748b' }}>Browse through thousands of available books and request an exchange.</p>
            </div>
            <div style={{ padding: '2rem', background: '#f8fafc', borderRadius: '16px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🤝</div>
              <h3 style={{ fontSize: '1.5rem', color: '#1e293b' }}>3. Swap & Read</h3>
              <p style={{ color: '#64748b' }}>Accept incoming requests, ship your book, and receive your new read!</p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
