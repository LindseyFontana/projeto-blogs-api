require('dotenv/config');
const ApplicationError = require('../error/error');
const tokenManager = require('../security/tokenManager');

const validate = async (request, _response, next) => {
    const token = request.headers.authorization;
    if (!token) throw new ApplicationError('Token not found', 401);
    try {
      tokenManager.validate(token);
      next();
    } catch (e) {
      throw new ApplicationError('Expired or invalid token', 401);
    }
};

module.exports = validate;