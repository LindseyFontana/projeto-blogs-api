const Joi = require('joi');
const ApplicationError = require('../error/error');
const { User } = require('../database/models');
const err = require('../constants/errorMessage');

const loginService = {
  validate: async (body) => {
   const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
   });
   const { error } = schema.validate(body);

   if (error) throw new ApplicationError(err.missingField, 400);
   const { email, password } = body;

   const user = await User.findOne({ where: { email, password } });
   if (!user) throw new ApplicationError(err.invalidField, 400);
  },
};

module.exports = loginService;