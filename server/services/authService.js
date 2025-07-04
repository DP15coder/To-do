const User = require('../models/User');
const generateToken = require('../utils/generateToken');

class AuthService {

  /* ------------------------- Register ----------------------------*/

  async register({ name, email, password }) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User already exists');
    }

    const newUser = await User.create({ name, email, password });

    return {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
      token: generateToken(newUser._id),
    };
  }
  /* ---------------------------- Login-------------------------- */

  async login({ email, password }) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User does not exist');
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      throw new Error('Incorrect password');
    }
    return {
      _id: user._id,
      email: user.email,
      name: user.name,
      token: generateToken(user._id),
    };
  }
}

module.exports = new AuthService();
