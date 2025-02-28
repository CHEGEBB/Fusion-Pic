const express = require('express');
const { 
  register, 
  login, 
  getMe, 
  forgotPassword, 
  resetPassword 
} = require('../controllers/authController');
const { 
  googleAuth, 
  githubAuth 
} = require('../controllers/socialAuthController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Local auth routes
router.post('/register', register);
router.post('/login', login);
// router.get('/me', protect, getMe);
// router.post('/forgotpassword', forgotPassword);
// router.put('/resetpassword/:resettoken', resetPassword);

// router.post('/google', googleAuth);
// router.post('/github', githubAuth);

module.exports = router;