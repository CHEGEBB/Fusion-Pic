// controllers/imageController.js
const path = require('path');
const fs = require('fs');
const Image = require('../models/Image');
const User = require('../models/User');
const imageGenerationService = require('../services/imageGenerationService');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Generate a new image
// @route   POST /api/images/generate
// @access  Private
exports.generateImage = asyncHandler(async (req, res, next) => {
  const { prompt, negativePrompt, resolution, color } = req.body;
  
  if (!prompt) {
    return next(new ErrorResponse('Please provide a prompt', 400));
  }
  
  // Format resolution for API
  const formattedResolution = formatResolution(resolution);
  
  // Generate the image
  const imageData = await imageGenerationService.generateImage(
    prompt, 
    negativePrompt, 
    formattedResolution, 
    req.user.id
  );
  
  // Create temporary image record (not saved to DB yet)
  const tempImage = {
    prompt,
    negativePrompt,
    resolution,
    color,
    imageUrl: imageData.imageUrl,
    filename: imageData.filename,
    localPath: imageData.localPath,
    user: req.user.id
  };
  
  // Store in session for later saving if user decides to save
  req.session.tempImage = tempImage;
  
  res.status(200).json({
    success: true,
    data: {
      imageUrl: imageData.imageUrl,
      id: imageData.id
    }
  });
});

// @desc    Save generated image to user's collection
// @route   POST /api/images/save
// @access  Private
exports.saveImage = asyncHandler(async (req, res, next) => {
  // Get temp image from session
  const tempImage = req.session.tempImage;
  
  if (!tempImage) {
    return next(new ErrorResponse('No image to save. Generate an image first.', 400));
  }
  
  // Create permanent record in database
  const image = await Image.create({
    prompt: tempImage.prompt,
    negativePrompt: tempImage.negativePrompt,
    resolution: tempImage.resolution,
    color: tempImage.color,
    imageUrl: tempImage.imageUrl,
    filename: tempImage.filename,
    user: req.user.id
  });
  
  // Clear temp image from session
  req.session.tempImage = null;
  
  res.status(201).json({
    success: true,
    data: image
  });
});

// @desc    Download generated image
// @route   GET /api/images/download/:filename
// @access  Private
exports.downloadImage = asyncHandler(async (req, res, next) => {
  const { filename } = req.params;
  
  // Check if image exists in temp directory
  const tempPath = path.join(__dirname, '../temp', filename);
  
  // Or check if it's a saved image
  const image = await Image.findOne({ filename });
  
  if (fs.existsSync(tempPath)) {
    return res.download(tempPath, filename);
  } else if (image) {
    // Download from the image URL
    return res.redirect(image.imageUrl);
  } else {
    return next(new ErrorResponse('Image not found', 404));
  }
});

// @desc    Share image to community
// @route   PUT /api/images/:id/share
// @access  Private
exports.shareImage = asyncHandler(async (req, res, next) => {
  let image = await Image.findById(req.params.id);
  
  if (!image) {
    return next(new ErrorResponse('Image not found', 404));
  }
  
  // Make sure user owns the image
  if (image.user.toString() !== req.user.id) {
    return next(new ErrorResponse('Not authorized to share this image', 401));
  }
  
  // Update the image to be shared
  image.shared = true;
  await image.save();
  
  res.status(200).json({
    success: true,
    data: image
  });
});

// @desc    Get user's image history
// @route   GET /api/images/history
// @access  Private
exports.getUserImages = asyncHandler(async (req, res, next) => {
  const images = await Image.find({ user: req.user.id }).sort('-createdAt');
  
  res.status(200).json({
    success: true,
    count: images.length,
    data: images
  });
});

// @desc    Get community images
// @route   GET /api/community/images
// @access  Private
exports.getCommunityImages = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  
  const images = await Image.find({ shared: true })
    .populate('user', 'name profilePicture')
    .sort('-createdAt')
    .skip(startIndex)
    .limit(limit);
  
  const total = await Image.countDocuments({ shared: true });
  
  res.status(200).json({
    success: true,
    count: images.length,
    pagination: {
      total,
      page,
      pages: Math.ceil(total / limit)
    },
    data: images
  });
});

// @desc    Like/unlike an image
// @route   POST /api/community/images/:id/like
// @access  Private
exports.likeImage = asyncHandler(async (req, res, next) => {
  const image = await Image.findById(req.params.id);
  
  if (!image) {
    return next(new ErrorResponse('Image not found', 404));
  }
  
  // Check if already liked
  const alreadyLiked = image.likes.includes(req.user.id);
  
  if (alreadyLiked) {
    // Unlike
    image.likes = image.likes.filter(userId => userId.toString() !== req.user.id);
  } else {
    // Like
    image.likes.push(req.user.id);
  }
  
  await image.save();
  
  res.status(200).json({
    success: true,
    liked: !alreadyLiked,
    data: image
  });
});

// @desc    Bookmark/unbookmark an image
// @route   POST /api/community/images/:id/bookmark
// @access  Private
exports.bookmarkImage = asyncHandler(async (req, res, next) => {
  const image = await Image.findById(req.params.id);
  
  if (!image) {
    return next(new ErrorResponse('Image not found', 404));
  }
  
  // Check if already bookmarked
  const alreadyBookmarked = image.bookmarks.includes(req.user.id);
  
  if (alreadyBookmarked) {
    // Unbookmark
    image.bookmarks = image.bookmarks.filter(userId => userId.toString() !== req.user.id);
  } else {
    // Bookmark
    image.bookmarks.push(req.user.id);
  }
  
  await image.save();
  
  res.status(200).json({
    success: true,
    bookmarked: !alreadyBookmarked,
    data: image
  });
});

// Helper function to format resolution from UI to API format
function formatResolution(resolution) {
  // Parse from format like "1024X1024(1:1)" to "1024x1024"
  if (!resolution) return "1024x1024";
  
  const match = resolution.match(/(\d+)X(\d+)/i);
  if (match) {
    return `${match[1]}x${match[2]}`;
  }
  
  return "1024x1024";
}