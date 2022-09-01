require('dotenv').config();

const options = {
  host: process.env.HOSTNAME || process.env.MYSQL_HOST || 'localhost',
  port: process.env.MYSQL_PORT || '3306',
  database: process.env.MYSQL_DB_NAME || 'blogs-api-dev',
  username: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '1234',
  dialect: 'mysql',
};

module.exports = {
  development: {
    ...options,
  },
};