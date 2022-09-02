const userService = require('../services/userService');

const usersController = {
  create: async (request, response) => {
    const newUser = request.body;
    const token = await userService.create(newUser);
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
    const { userId } = request.body;
    await userService.delete(userId);
    response.status(204).send();
  },
};

module.exports = usersController;