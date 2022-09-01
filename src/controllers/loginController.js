require('dotenv/config');
const loginService = require('../services/loginService');
const userService = require('../services/userService');
const tokenManager = require('../security/tokenManager');
const { User } = require('../database/models');

const loginController = {
  authenticate: async (request, response) => {
    const authCredentials = request.body;
    await loginService.authenticate(authCredentials);
    const { id } = await User.findOne({where: {email: authCredentials.email}, attributes: { exclude: 'password' } });
    const infosToken = {id, email: authCredentials.email}
    const token = tokenManager.create(infosToken);
    response.status(200).json({ token });
  },
};

module.exports = loginController;