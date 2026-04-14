import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import AddBookForm from '../components/books/AddBookForm';

const AddBookPage = () => {
  return (
    <>
      <Navbar />
      <div className="page-content" style={{ background: '#f8fafc' }}>
        <div className="page-container">
          <AddBookForm />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddBookPage;
