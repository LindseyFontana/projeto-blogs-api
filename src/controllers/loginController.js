require('dotenv/config');
const loginService = require('../services/loginService');

const loginController = {
  authenticate: async (request, response) => {
    const token = await loginService.authenticate(request.body);
    response.status(200).json({ token });
  },
};

module.exports = loginController;