const bcrypt = require('bcryptjs');

const passwordCrypto = {
  validate: (password, passwordDataBase) => {
    const encryptedPassword = bcrypt.compareSync(password, passwordDataBase);
    return encryptedPassword;
  },

  encryptPassword: (password) => {
    const salt = bcrypt.genSaltSync(8);
    const encryptedPassword = bcrypt.hashSync(password, salt);
    return encryptedPassword;
  },
};

module.exports = passwordCrypto;
