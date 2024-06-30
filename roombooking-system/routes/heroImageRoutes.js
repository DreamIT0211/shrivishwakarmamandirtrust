// routes/heroImageRoutes.js
const express = require('express');
const router = express.Router();
const heroImageController = require('../controllers/heroImageController');

router.get('/', heroImageController.getAllHeroImages);
router.get('/admin', heroImageController.getAllHeroImagesAdmin);
router.post('/', heroImageController.createHeroImage);
router.put('/:image_id', heroImageController.updateHeroImage);
router.delete('/:image_id', heroImageController.deleteHeroImage);
router.get('/:image_id', heroImageController.getHeroImageById);

module.exports = router;
