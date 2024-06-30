// routes/headlineRoutes.js

const express = require('express');
const router = express.Router();
const headlineController = require('../controllers/headlineController');

router.get('/', headlineController.getHeadline);
router.post('/', headlineController.createHeadline);
router.put('/:id', headlineController.updateHeadline); // id here refers to NewsLineID
router.delete('/:id', headlineController.deleteHeadline); // id here refers to NewsLineID

module.exports = router;
