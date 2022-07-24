require('dotenv/config');
const jwt = require('jsonwebtoken');
const ApplicationError = require('../error/error');

const validate = async (request, _response, next) => {
    const token = request.headers.authorization;
    if (!token) throw new ApplicationError('Token not found', 401);
    try {
      jwt.verify(token, process.env.JWT_SECRET);
      next();
    } catch (e) {
      throw new ApplicationError('Expired or invalid token', 401);
    }
};

module.exports = validate;