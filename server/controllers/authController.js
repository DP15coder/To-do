


const authService = require('../services/authService');

class AuthController {
  /* ------------------------- Register ----------------------------*/

  async registerUser(req, res) {
    try {
      const userData = await authService.register(req.body);
      return res.status(201).json(userData);
    } catch (error) {
      console.error('Registration Error:', error.message);
      return res.status(400).json({ message: error.message });
    }
  }


  
/* ------------------------- Login ----------------------------*/

  async loginUser(req, res) {
    try {
      const userData = await authService.login(req.body);
      return res.status(200).json(userData);
    } catch (error) {
      console.error('Login Error:', error.message);
      const code = error.message.includes('password') ? 401 : 404;
      return res.status(code).json({ message: error.message });
    }
  }
}

module.exports = new AuthController();
