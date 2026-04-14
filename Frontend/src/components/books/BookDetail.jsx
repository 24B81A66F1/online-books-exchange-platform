import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBookById } from '../../api/bookApi';
import { createExchangeRequest } from '../../api/exchangeApi';
import { useAuth } from '../../context/AuthContext';
import './Books.css';

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth(); // for checking owner

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const { data } = await getBookById(id);
        setBook(data);
      } catch (err) {
        console.error('Failed to get book details', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDetail();
  }, [id]);

  if (loading) {
    return <div className="books-container" style={{textAlign: 'center', padding: '4rem'}}>Loading book details...</div>;
  }

  if (!book) {
    return <div className="books-container">Book not found.</div>;
  }

  const handleRequestExchange = async () => {
    try {
      if (!user) {
        alert('Please login to request an exchange.');
        return navigate('/login');
      }
      await createExchangeRequest({ requestedBookId: book._id, message: `I would like to exchange for ${book.title}.` });
      alert('Exchange request sent successfully!');
      navigate('/exchange');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to send request');
    }
  };

  return (
    <div className="books-container">
      <div className="book-detail-container">
        
        <div className="book-detail-cover">
          {book.coverUrl ? (
            <img src={book.coverUrl} alt={book.title} className="book-detail-img" />
          ) : (
            <div className="book-detail-cover-placeholder">
              {book.title}
            </div>
          )}
        </div>

        <div className="book-detail-info">
          <h1 className="book-detail-title">{book.title}</h1>
          <p className="book-detail-author">by {book.author}</p>
          
          <div>
            <span className="book-tag">{book.genre}</span>
            <span className="book-tag">Condition: {book.condition}</span>
          </div>

          <p className="book-detail-desc">{book.description || 'No description provided for this book.'}</p>
          
          <div className="book-owner-card">
            <div className="owner-avatar">
              {book.owner.name.charAt(0)}
            </div>
            <div>
              <div style={{fontSize: '0.9rem', color: '#64748b'}}>Listed by</div>
              <div style={{fontWeight: '700', color: '#1e293b'}}>{book.owner.name}</div>
            </div>
          </div>

          <button onClick={handleRequestExchange} className="request-btn">
            Request to Exchange
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
