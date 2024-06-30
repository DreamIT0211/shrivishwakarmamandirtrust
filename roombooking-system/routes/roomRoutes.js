// routes/roomRoutes.js
const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');

router.get('/', roomController.getAllRooms);
router.post('/', roomController.createRoom);
router.put('/:RoomID', roomController.updateRoom);
router.delete('/:RoomID', roomController.deleteRoom);   
router.get('/available-rooms', roomController.getAvailableRooms);


module.exports = router;
