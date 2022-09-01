const Joi = require('joi');
const ApplicationError = require('../error/error');
const err = require('../constants/errorMessage');
const userService = require('./userService');
const tokenManager = require('../security/tokenManager');

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
    const {id, email} = await userService.getUser(body);
  
    if (!id || !email) throw new ApplicationError(err.INVALID_FIELD, 400);

    return tokenManager.create({id, email});
  },
};

module.exports = loginService;
