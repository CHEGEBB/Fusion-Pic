// models/Image.js
const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  prompt: {
    type: String,
    required: [true, 'Please provide a prompt']
  },
  negativePrompt: {
    type: String,
    default: ''
  },
  resolution: {
    type: String,
    default: '1024x1024'
  },
  imageUrl: {
    type: String,
    required: [true, 'Image URL is required']
  },
  filename: {
    type: String,
    required: [true, 'Filename is required']
  },
  color: {
    type: String,
    default: ''
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  },
  shared: {
    type: Boolean,
    default: false
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  bookmarks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Image', ImageSchema);