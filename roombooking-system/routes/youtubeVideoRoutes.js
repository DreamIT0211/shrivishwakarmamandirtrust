const express = require('express');
const router = express.Router();
const youtubeVideoController = require('../controllers/youtubeVideoController');

router.get('/', youtubeVideoController.getAllVideos);
router.get('/admin', youtubeVideoController.getAllVideosAdmin);
router.post('/', youtubeVideoController.createVideo);
router.put('/:video_id', youtubeVideoController.updateVideo);
router.delete('/:video_id', youtubeVideoController.deleteVideo);
router.get('/:video_id', youtubeVideoController.getVideoById);

module.exports = router;
