import React, { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import BookGrid from '../components/books/BookGrid';
import Spinner from '../components/layout/Spinner';
import { getMyBooks } from '../api/bookApi';

const MyBooksPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyBooks = async () => {
      try {
        const { data } = await getMyBooks();
        setBooks(data);
      } catch (err) {
        console.error('Failed to fetch my books', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyBooks();
  }, []);

  return (
    <>
      <Navbar />
      <div className="page-content" style={{ background: '#f8fafc' }}>
        <div className="page-container">
          <h1 className="section-title">My Listed Books</h1>
          {loading ? <Spinner /> : <BookGrid books={books} />}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyBooksPage;
