require('dotenv/config');
const jwt = require('jsonwebtoken');

const tokenManager = {
  validate: (token) => {
    jwt.verify(token, process.env.JWT_SECRET);
  },

  create: (user) => jwt
    .sign(user, process.env.JWT_SECRET, { expiresIn: '1d' }),
};

module.exports = tokenManager;