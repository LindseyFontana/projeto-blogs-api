const Joi = require('joi');
const ApplicationError = require('../error/error');
const { User } = require('../database/models');
const err = require('../constants/errorMessage');

const userService = {
  validate: async (newUser) => {
   const schema = Joi.object({
    displayName: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    image: Joi.string(),
   });
   const { error } = schema.validate(newUser);

   if (error) throw new ApplicationError(error.details[0].message, 400);
  },

  verifyIfExists: async (email) => {
    const user = await User.findOne({ where: { email } });
    if (user) throw new ApplicationError(err.userInvalid, 409);
    return user;
  },

  create: async (newUser) => {
    const user = await User.create(newUser);
    return user;
  },

  getAll: async () => {
    const users = await User.findAll({ attributes: { exclude: 'password' } });
    return users;
  },

  getById: async (id) => {
    const user = await User.findByPk(id, { attributes: { exclude: 'password' } });
    if (!user) throw new ApplicationError(err.userNotExists, 404);
    return user;
  },
};

module.exports = userService;
