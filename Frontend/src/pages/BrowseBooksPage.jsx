import React, { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import BookGrid from '../components/books/BookGrid';
import Spinner from '../components/layout/Spinner';
import { getAllBooks } from '../api/bookApi';

const BrowseBooksPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data } = await getAllBooks();
        setBooks(data);
      } catch (err) {
        console.error('Failed to fetch books', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <>
      <Navbar />
      <div className="page-content bg-gray-50" style={{ background: '#f8fafc' }}>
        <div className="page-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 className="section-title" style={{ marginBottom: 0 }}>Browse Books</h1>
          </div>
          
          {loading ? (
            <Spinner />
          ) : (
            <div style={{ marginTop: '2rem' }}>
              <BookGrid books={books} />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BrowseBooksPage;
