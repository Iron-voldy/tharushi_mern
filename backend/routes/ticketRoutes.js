const express = require('express');
const router = express.Router();
const {
    searchBuses,
    getBusDetails,
    bookTicket,
    getTicketDetails
} = require('../controllers/ticketController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/search', searchBuses);
router.get('/bus/:id', getBusDetails);
router.post('/book', protect, bookTicket);
router.get('/:id', protect, getTicketDetails);

module.exports = router;