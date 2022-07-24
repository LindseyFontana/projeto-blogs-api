const Joi = require('joi');
const ApplicationError = require('../error/error');
const { User } = require('../database/models');

const loginService = {
  validate: async (body) => {
   const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
   });
   const { error } = schema.validate(body);

   if (error) throw new ApplicationError('Some required fields are missing', 400);
   const { email, password } = body;

   const user = await User.findOne({ where: { email, password } });
   if (!user) throw new ApplicationError('Invalid fields', 400);
  },
};

module.exports = loginService;