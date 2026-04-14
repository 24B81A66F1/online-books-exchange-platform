const asyncHandler = require('express-async-handler');
const User = require('../models/User');

// @desc  Update profile
// @route PUT /api/users/profile
const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404); throw new Error('User not found');
  }

  user.name = req.body.name || user.name;
  user.bio = req.body.bio || user.bio;
  user.location = req.body.location || user.location;
  if (req.file) user.avatar = req.file.path;

  if (req.body.password) {
    user.password = req.body.password;
  }

  const updated = await user.save();

  res.json({
    _id: updated._id,
    name: updated.name,
    email: updated.email,
    bio: updated.bio,
    location: updated.location,
    avatar: updated.avatar,
  });
});

// @desc  Get public profile of any user
// @route GET /api/users/:id
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (!user) {
    res.status(404); throw new Error('User not found');
  }
  res.json(user);
});

module.exports = { updateProfile, getUserProfile };