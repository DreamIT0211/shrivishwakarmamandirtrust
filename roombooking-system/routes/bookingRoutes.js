// routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.get('/', bookingController.getAllBookings);
router.post('/', bookingController.createBooking);
router.put('/:BookingID', bookingController.updateBooking);
router.delete('/:BookingID', bookingController.deleteBooking);
router.get('/user/:UserID', bookingController.getBookingsByUserID);

// Add other routes for creating, updating, and deleting bookings

module.exports = router;
