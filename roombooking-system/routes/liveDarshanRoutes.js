// routes/liveDarshanRoutes.js

const express = require('express');
const router = express.Router();
const liveDarshanController = require('../controllers/liveDarshanController');

router.get('/', liveDarshanController.getLiveDarshan);
router.post('/', liveDarshanController.createLiveDarshan);
router.put('/:id', liveDarshanController.updateLiveDarshan);
router.delete('/:id', liveDarshanController.deleteLiveDarshan);

module.exports = router;
