import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addBook } from '../../api/bookApi';
import './Books.css';

const AddBookForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    condition: 'Good',
    description: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await addBook(formData);
      setIsLoading(false);
      navigate('/books'); // redirect to books grid
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Failed to list book');
      setIsLoading(false);
    }
  };

  return (
    <div className="book-form-container">
      <h2 style={{marginTop: 0, marginBottom: '2rem', color: '#1e293b'}}>List a Book for Exchange</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="title">Book Title</label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-input"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="e.g. The Great Gatsby"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            className="form-input"
            value={formData.author}
            onChange={handleChange}
            required
            placeholder="e.g. F. Scott Fitzgerald"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="genre">Genre</label>
          <select
            id="genre"
            name="genre"
            className="form-select"
            value={formData.genre}
            onChange={handleChange}
            required
          >
            <option value="">Select a Genre</option>
            <option value="Fiction">Fiction</option>
            <option value="Non-Fiction">Non-Fiction</option>
            <option value="Science Fiction">Science Fiction</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Mystery">Mystery</option>
            <option value="Biography">Biography</option>
            <option value="History">History</option>
            <option value="Self-Help">Self-Help</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="condition">Condition</label>
          <select
            id="condition"
            name="condition"
            className="form-select"
            value={formData.condition}
            onChange={handleChange}
            required
          >
            <option value="New">New</option>
            <option value="Like New">Like New</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
            <option value="Poor">Poor</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="description">Description & Notes</label>
          <textarea
            id="description"
            name="description"
            className="form-textarea"
            value={formData.description}
            onChange={handleChange}
            placeholder="Share any details about the book's edition, missing pages, or your thoughts."
          />
        </div>

        <button type="submit" className="form-submit-btn" disabled={isLoading}>
          {isLoading ? 'Listing Book...' : 'List Book'}
        </button>
      </form>
    </div>
  );
};

export default AddBookForm;
