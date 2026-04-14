import React from 'react';
import './Layout.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3 style={{ color: 'white', margin: '0' }}>BookXchange Platform</h3>
        <p style={{ margin: '0', fontSize: '0.9rem' }}>
          Connect with readers everywhere. Trade books you've finished for ones you want to read.
        </p>
        <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#94a3b8' }}>
          &copy; {new Date().getFullYear()} BookXchange. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
