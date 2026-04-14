import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Books.css';

const BookCard = ({ book }) => {
  const navigate = useNavigate();

  return (
    <div className="book-card" onClick={() => navigate(`/books/${book._id || book.id}`)}>
      {book.coverUrl ? (
        <img src={book.coverUrl} alt={book.title} className="book-cover" />
      ) : (
        <div className="book-cover-placeholder">
          {book.title}
        </div>
      )}
      
      <div className="book-info">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">by {book.author}</p>
        
        <div className="book-meta">
          <span className="book-genre">{book.genre || 'General'}</span>
          <span className="book-condition">{book.condition || 'Good'}</span>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
