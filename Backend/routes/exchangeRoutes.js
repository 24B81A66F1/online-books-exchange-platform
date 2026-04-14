const express = require('express');
const router = express.Router();
const {
  createExchangeRequest,
  getIncomingRequests,
  getOutgoingRequests,
  updateRequestStatus,
} = require('../controllers/exchangeController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.post('/', createExchangeRequest);
router.get('/incoming', getIncomingRequests);
router.get('/outgoing', getOutgoingRequests);
router.put('/:id', updateRequestStatus);

module.exports = router;