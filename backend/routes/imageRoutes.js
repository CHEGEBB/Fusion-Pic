// routes/imageRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  generateImage,
  saveImage,
  downloadImage,
  shareImage,
  getUserImages,
  getCommunityImages,
  likeImage,
  bookmarkImage
} = require('../controllers/imageController');

// Image generation and management routes
router.post('/generate', protect, generateImage);
router.post('/save', protect, saveImage);
router.get('/download/:filename', protect, downloadImage);
router.put('/:id/share', protect, shareImage);
router.get('/history', protect, getUserImages);

// Export the router
module.exports = router;