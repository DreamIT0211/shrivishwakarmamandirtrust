// routes/contactRoutes.js

const express = require('express');
const router = express.Router();

const { sendContactMessage } = require('../controllers/contactController');

// Define the route for handling the POST request to submit the contact form
router.post('/', sendContactMessage);

module.exports = router;
