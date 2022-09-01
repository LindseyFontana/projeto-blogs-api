const Joi = require('joi');
const ApplicationError = require('../error/error');
const { User } = require('../database/models');
const err = require('../constants/errorMessage');
const tokenManager = require('../security/tokenManager');
const { decode } = require('jsonwebtoken');

const authenticate = async (newUser) => {
  const schema = Joi.object({
   displayName: Joi.string().min(8).required(),
   email: Joi.string().email().required(),
   password: Joi.string().min(6).required(),
   image: Joi.string(),
  });
  const { error } = schema.validate(newUser);

  if (error) throw new ApplicationError(error.details[0].message, 400);
 };

const verifyIfExists = async (email) => {
  const user = await User.findOne({ where: { email } });
  if (user) throw new ApplicationError(err.USER_INVALID, 409);
  return user;
};

const userService = {
  create: async (newUser) => {
    await authenticate(newUser);
    await verifyIfExists(newUser.email);
    return User.create(newUser);
  },

  getAll: async () => {
    const users = await User.findAll({ attributes: { exclude: 'password' } });
    return users;
  },

  getById: async (id) => {
    const user = await User.findByPk(id, { attributes: { exclude: 'password' } });
    if (!user) throw new ApplicationError(err.USER_NOT_EXISTS, 404);
    return user;
  },

  extractUserIdFromAccessToken: async (token) => {
    const { id } = tokenManager.validate(token);
    return id;
  },

  delete: async (userId) => {
    await User.destroy({
      where: { id: userId },
    });
  },
};

module.exports = userService;
