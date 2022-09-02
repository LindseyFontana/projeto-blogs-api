const Joi = require('joi');
const ApplicationError = require('../error/error');
const { User } = require('../database/models');
const err = require('../constants/errorMessage');
const tokenManager = require('../security/tokenManager');

const validateBody = async (newUser) => {
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
    await validateBody(newUser);
    await verifyIfExists(newUser.email);
    await User.create(newUser);
    const {id, email} = await userService.getUser(newUser)
    return tokenManager.create({id, email});
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

  getUser: async (body) => {
    const {email, password } = body
    const user = await User.findOne({ where: { email, password }, attributes: { exclude: 'password' } });
    return user.dataValues;
  },
  
  delete: async (userId) => {
    await User.destroy({
      where: { id: userId },
    });
  },
};

module.exports = userService;
