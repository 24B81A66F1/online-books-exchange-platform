const asyncHandler = require('express-async-handler');
const ExchangeRequest = require('../models/ExchangeRequest');
const Book = require('../models/Book');

// @desc  Send exchange request
// @route POST /api/exchanges
const createExchangeRequest = asyncHandler(async (req, res) => {
  const { requestedBookId, offeredBookId, message } = req.body;

  const requestedBook = await Book.findById(requestedBookId);
  if (!requestedBook) {
    res.status(404); throw new Error('Requested book not found');
  }
  if (!requestedBook.isAvailable) {
    res.status(400); throw new Error('Book is not available');
  }
  if (requestedBook.owner.toString() === req.user._id.toString()) {
    res.status(400); throw new Error('You cannot request your own book');
  }

  const existing = await ExchangeRequest.findOne({
    requester: req.user._id,
    requestedBook: requestedBookId,
    status: 'pending',
  });
  if (existing) {
    res.status(400); throw new Error('You already have a pending request for this book');
  }

  const request = await ExchangeRequest.create({
    requester: req.user._id,
    owner: requestedBook.owner,
    requestedBook: requestedBookId,
    offeredBook: offeredBookId || null,
    message,
  });

  res.status(201).json(request);
});

// @desc  Get incoming requests (books I own)
// @route GET /api/exchanges/incoming
const getIncomingRequests = asyncHandler(async (req, res) => {
  const requests = await ExchangeRequest.find({ owner: req.user._id })
    .populate('requester', 'name avatar')
    .populate('requestedBook', 'title author image')
    .populate('offeredBook', 'title author image')
    .sort({ createdAt: -1 });

  res.json(requests);
});

// @desc  Get outgoing requests (I sent)
// @route GET /api/exchanges/outgoing
const getOutgoingRequests = asyncHandler(async (req, res) => {
  const requests = await ExchangeRequest.find({ requester: req.user._id })
    .populate('owner', 'name avatar')
    .populate('requestedBook', 'title author image')
    .populate('offeredBook', 'title author image')
    .sort({ createdAt: -1 });

  res.json(requests);
});

// @desc  Accept or reject a request
// @route PUT /api/exchanges/:id
const updateRequestStatus = asyncHandler(async (req, res) => {
  const { status } = req.body; // 'accepted' | 'rejected'

  const request = await ExchangeRequest.findById(req.params.id);
  if (!request) {
    res.status(404); throw new Error('Request not found');
  }
  if (request.owner.toString() !== req.user._id.toString()) {
    res.status(403); throw new Error('Not authorized');
  }

  request.status = status;
  await request.save();

  if (status === 'accepted') {
    await Book.findByIdAndUpdate(request.requestedBook, { isAvailable: false });
  }

  res.json(request);
});

module.exports = {
  createExchangeRequest,
  getIncomingRequests,
  getOutgoingRequests,
  updateRequestStatus,
};