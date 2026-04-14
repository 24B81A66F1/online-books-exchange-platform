const asyncHandler = require('express-async-handler');
const Book = require('../models/Book');
const { cloudinary } = require('../config/cloudinary');

// @desc  Get all available books
// @route GET /api/books
const getAllBooks = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
      $or: [
        { title: { $regex: req.query.search, $options: 'i' } },
        { author: { $regex: req.query.search, $options: 'i' } },
        { genre: { $regex: req.query.search, $options: 'i' } },
      ],
    }
    : {};

  const books = await Book.find({ ...keyword, isAvailable: true })
    .populate('owner', 'name avatar location')
    .sort({ createdAt: -1 });

  res.json(books);
});

// @desc  Get single book
// @route GET /api/books/:id
const getBookById = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id)
    .populate('owner', 'name avatar location bio');

  if (!book) {
    res.status(404);
    throw new Error('Book not found');
  }
  res.json(book);
});

// @desc  Add a book
// @route POST /api/books
const addBook = asyncHandler(async (req, res) => {
  const { title, author, description, genre, condition } = req.body;

  const book = await Book.create({
    owner: req.user._id,
    title,
    author,
    description,
    genre,
    condition,
    image: req.file ? req.file.path : '',
    imagePublicId: req.file ? req.file.filename : '',
  });

  res.status(201).json(book);
});

// @desc  Delete a book
// @route DELETE /api/books/:id
const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    res.status(404);
    throw new Error('Book not found');
  }

  if (book.owner.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to delete this book');
  }

  if (book.imagePublicId) {
    await cloudinary.uploader.destroy(book.imagePublicId);
  }

  await book.deleteOne();
  res.json({ message: 'Book removed' });
});

// @desc  Get books by logged-in user
// @route GET /api/books/mybooks
const getMyBooks = asyncHandler(async (req, res) => {
  const books = await Book.find({ owner: req.user._id }).sort({ createdAt: -1 });
  res.json(books);
});

module.exports = { getAllBooks, getBookById, addBook, deleteBook, getMyBooks };