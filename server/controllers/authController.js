const User = require('../models/User');
const generateToken = require('../utils/generateToken');
class AuthController {

  // @desc    Register a new user
  // @route   POST /api/auth/register
  // @access  Public
  async registerUser(req, res) {
    console.log("welcome")
    try {
      const { name, email, password } = req.body;
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Create the user
      const newUser = await User.create({ name, email, password });

      // Build response without password
      const userData = {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
        token: generateToken(newUser._id)
      };
      return res.status(201).json(userData);

    } catch (error) {
      console.error("Registration Error:", error.message);
      return res.status(500).json({ message: "Server error during registration" });
    }
  }

  // @desc    login user
  // @route   POST /api/auth/login
  // @access  Public

  async loginUser(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User does not exist' });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    res.status(200).json({
      _id: user._id,
      email: user.email,
      name: user.name,

      token: generateToken(user._id),
    });
  } catch (error) {
    console.error('Login Error:', error.message);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
}

}

module.exports = new AuthController();




