// routes/galleryRoutes.js
const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController');

// Routes for CRUD operations on gallery
router.get('/cli', galleryController.getAllImages);
router.get('/', galleryController.getImagesPaginated);
router.post('/', galleryController.uploadImage);
router.put('/:id', galleryController.updateImage);
router.delete('/:id', galleryController.deleteImage);

module.exports = router;
