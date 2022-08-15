require('dotenv/config');
const loginService = require('../services/loginService');
const tokenManager = require('../security/tokenManager');

const loginController = {
  authenticate: async (request, response) => {
    const authCredentials = request.body;
    await loginService.authenticate(authCredentials);
    const token = tokenManager.create(authCredentials);
    response.status(200).json({ token });
  },
};

module.exports = loginController;