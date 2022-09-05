const Joi = require('joi');
const ApplicationError = require('../error/error');
const err = require('../constants/errorMessage');
const userService = require('./userService');
const tokenManager = require('../security/tokenManager');
const passwordCrypto = require('../security/passwordCrypto');
const { User } = require('../database/models');

const validateRequestBody = (body) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
   });
   const { error } = schema.validate(body);

   if (error) throw new ApplicationError(err.MISSING_FIELD, 400);
};

const loginService = {
  authenticate: async (body) => {
    validateRequestBody(body);
    const user = await User.findOne({ where: { email: body.email } });
    const passwordIsRight = passwordCrypto.validate(body.password, user.password);
    if (!passwordIsRight) throw new ApplicationError(err.INVALID_FIELD, 400);
    const {id, email} = await userService.getUser(body);
    if (!id || !email) throw new ApplicationError(err.INVALID_FIELD, 400);

    return tokenManager.create({id, email});
  },
};

module.exports = loginService;
