import React from 'react';
import BookCard from './BookCard';
import './Books.css';

const BookGrid = ({ books, title }) => {
  if (!books || books.length === 0) {
    return (
      <div className="books-container">
        {title && <h2 className="books-title" style={{marginBottom: '2rem'}}>{title}</h2>}
        <div style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>
          <h3>No books found.</h3>
          <p>Be the first to list a book for exchange!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="books-container">
      {title && (
        <div className="books-header">
          <h2 className="books-title">{title}</h2>
        </div>
      )}
      
      <div className="book-grid">
        {books.map(book => (
          <BookCard key={book._id || book.id || Math.random()} book={book} />
        ))}
      </div>
    </div>
  );
};

export default BookGrid;
