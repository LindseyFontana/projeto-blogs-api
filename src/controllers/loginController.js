require('dotenv/config');
const loginService = require('../services/loginService');
const tokenManager = require('../security/tokenManager');

const loginController = {
  validate: async (request, response) => {
    const user = request.body;
    await loginService.validate(user);
    const token = tokenManager.create(user);
    response.status(200).json({ token });
  },
};

module.exports = loginController;