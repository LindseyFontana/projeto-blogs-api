require('dotenv/config');
const jwt = require('jsonwebtoken');
const loginService = require('../services/loginService');

const loginController = {
  validate: async (request, response) => {
    const user = request.body;
    await loginService.validate(user);
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1d' });
    response.status(200).json({ token });
  },
};

module.exports = loginController;