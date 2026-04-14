import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import BookDetail from '../components/books/BookDetail';

const BookDetailPage = () => {
  return (
    <>
      <Navbar />
      <div className="page-content" style={{ background: '#f8fafc' }}>
        <BookDetail />
      </div>
      <Footer />
    </>
  );
};

export default BookDetailPage;
