// routes/communityRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getCommunityImages,
  likeImage,
  bookmarkImage
} = require('../controllers/imageController');

// Community routes
router.get('/images', protect, getCommunityImages);
router.post('/images/:id/like', protect, likeImage);
router.post('/images/:id/bookmark', protect, bookmarkImage);

// Export the router
module.exports = router;