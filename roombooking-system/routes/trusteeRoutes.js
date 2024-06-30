// routes/trusteeRoutes.js
const express = require('express');
const router = express.Router();
const trusteeController = require('../controllers/trusteeController');

// Routes for CRUD operations on trustees
router.get('/', trusteeController.getAllTrustees);
router.get('/cli', trusteeController.getAllTrusteesClient);
router.post('/', trusteeController.createTrustee);
router.put('/:id', trusteeController.updateTrustee);
router.delete('/:id', trusteeController.deleteTrustee);

module.exports = router;