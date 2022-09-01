require('dotenv/config');
const loginService = require('../services/loginService');

const loginController = {
  authenticate: async (request, response) => {
    const authCredentials = request.body;
    const token = await loginService.authenticate(authCredentials);
    response.status(200).json({ token });
  },
};

module.exports = loginController;