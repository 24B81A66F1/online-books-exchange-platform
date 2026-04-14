import api from './axiosConfig';

export const getAllBooks = (search = '') => api.get(`/books?search=${search}`);
export const getBookById = (id) => api.get(`/books/${id}`);
export const getMyBooks = () => api.get('/books/mybooks');
export const addBook = (formData) => api.post('/books', formData);
export const deleteBook = (id) => api.delete(`/books/${id}`);