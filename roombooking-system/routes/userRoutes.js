// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// router.get('/', userController.getAllUsers);
router.get('/', userController.getAllUsersAdmin);
router.post('/register', userController.registerUser);
router.put('/:UserID', userController.updateUser);
router.delete('/:UserID', userController.deleteUser);
router.post('/login', userController.loginUser);
router.post('/forgot-password', userController.forgotPassword);
router.post('/reset-password', userController.resetPassword);

module.exports = router;
