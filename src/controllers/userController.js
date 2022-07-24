require('dotenv/config');
const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

const usersController = {
  create: async (request, response) => {
    const newUser = request.body;

    await userService.validate(newUser);
    await userService.verifyIfExists(newUser.email);
    await userService.create(newUser);
  
    const token = jwt.sign(request.body, process.env.JWT_SECRET);
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
};

module.exports = usersController;