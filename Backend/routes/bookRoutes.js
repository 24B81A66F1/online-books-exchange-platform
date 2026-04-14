const express = require('express');
const router = express.Router();
const {
  getAllBooks, getBookById, addBook, deleteBook, getMyBooks
} = require('../controllers/bookController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.get('/', getAllBooks);
router.get('/mybooks', protect, getMyBooks);
router.get('/:id', getBookById);
router.post('/', protect, upload.single('image'), addBook);
router.delete('/:id', protect, deleteBook);

module.exports = router;