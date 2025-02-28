const User = require('../models/User');

// @desc    Google OAuth callback
// @route   POST /api/auth/google
// @access  Public
exports.googleAuth = async (req, res, next) => {
  try {
    const { idToken, name, email } = req.body;
    
    // In a real implementation, you would verify the idToken with Google
    // For now, we'll trust the token and proceed
    
    // Find if user exists
    let user = await User.findOne({ email });
    
    if (user) {
      // If user exists but used different provider, update the provider
      if (user.provider !== 'google') {
        user.provider = 'google';
        await user.save({ validateBeforeSave: false });
      }
    } else {
      // Create new user
      user = await User.create({
        name,
        email,
        provider: 'google',
        providerId: email // Using email as providerId for simplicity
      });
    }
    
    // Send token response
    sendTokenResponse(user, 200, res);
  } catch (err) {
    next(err);
  }
};

// @desc    GitHub OAuth callback
// @route   POST /api/auth/github
// @access  Public
exports.githubAuth = async (req, res, next) => {
  try {
    const { token, name, email } = req.body;
    
    // In a real implementation, you would verify the token with GitHub
    // For now, we'll trust the token and proceed
    
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email not provided by GitHub. Please try another method.'
      });
    }
    
    // Find if user exists
    let user = await User.findOne({ email });
    
    if (user) {
      // If user exists but used different provider, update the provider
      if (user.provider !== 'github') {
        user.provider = 'github';
        await user.save({ validateBeforeSave: false });
      }
    } else {
      // Create new user
      user = await User.create({
        name: name || email.split('@')[0], // Use part of email as name if not provided
        email,
        provider: 'github',
        providerId: email // Using email as providerId for simplicity
      });
    }
    
    // Send token response
    sendTokenResponse(user, 200, res);
  } catch (err) {
    next(err);
  }
};

// Helper function to get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();
  
  res.status(statusCode).json({
    success: true,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      provider: user.provider
    }
  });
};