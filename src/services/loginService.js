const Joi = require('joi');
const ApplicationError = require('../error/error');
const { User } = require('../database/models');
const err = require('../constants/errorMessage');

const authenticatePayload = (body) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
   });
   const { error } = schema.validate(body);

   if (error) throw new ApplicationError(err.MISSING_FIELD, 400);
};

const loginService = {
  authenticate: async (body) => {
    authenticatePayload(body);

    const { email, password } = body;
    const user = await User.findOne({ where: { email, password }, attributes: { exclude: 'password' } });
    
    if (!user) throw new ApplicationError(err.INVALID_FIELD, 400);
  },
};

module.exports = loginService;
