const { User } = require('../models');

const verifyCredentials = async (email, password) => {
  const verification = await User.findOne({
    where: {
      email,
      password,
    },
  });
  return verification;
};

module.exports = {
  verifyCredentials,
};