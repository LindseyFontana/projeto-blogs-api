const userService = require('../services/userService');
const tokenManager = require('../security/tokenManager');
const { User } = require('../database/models');

const usersController = {
  create: async (request, response) => {
    const newUser = request.body;
    await userService.create(newUser);
    const { id } = await User.findOne({where: {email: newUser.email}, attributes: { exclude: 'password' } });
    const infosToken = {id, email: newUser.email}
    const token = tokenManager.create(infosToken);
    response.status(201).json({ token });
  },

  getAll: async (_request, response) => {
    const users = await userService.getAll();
    response.status(200).json(users);
  },

  getById: async (request, response) => {
    const { id } = request.params;
    const user = await userService.getById(id);
    response.status(200).json(user);
  },

  delete: async (request, response) => {
    const token = request.headers.authorization;
    const userId = await userService.extractUserIdFromAccessToken(token);
    await userService.delete(Number(userId));
    response.status(204).send();
  },
};

module.exports = usersController;