require('dotenv/config');
const ApplicationError = require('../error/error');
const tokenManager = require('../security/tokenManager');
var httpContext = require('express-http-context');
const err = require('../constants/errorMessage');

const validate = async (request, _response, next) => {
    const token = request.headers.authorization;
    if (!token) throw new ApplicationError(err.TOKEN_NOT_FOUND, 401);
    try {
      const decode = tokenManager.validate(token);
      httpContext.set('authenticateUser', {userId: decode.id, userEmail: decode.email} )
      next();
    } catch (e) {
      throw new ApplicationError(err.TOKEN_EXPIRED, 401);
    }
};

module.exports = validate;