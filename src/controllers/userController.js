const userService = require('../services/userService');
var httpContext = require('express-http-context');

const usersController = {
  create: async (request, response) => {
    const token = await userService.create(request.body);
    response.status(201).json({ token });
  },

  getAll: async (_request, response) => {
    const users = await userService.getAll();
    response.status(200).json(users);
  },

  getById: async (request, response) => {
    const { id } = request.params;
    const user = await userService.getById(Number(id));
    response.status(200).json(user);
  },

  delete: async (request, response) => {
    const idToDelete = request.params.id;
    var { userId } = httpContext.get('authenticateUser')
    await userService.delete(userId, Number(idToDelete));
    response.status(204).send();
  },
};

module.exports = usersController;