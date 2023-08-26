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

const insert = async (displayName, email, password, image) => {
  const userAlreadyExists = await verifyCredentials(email, password);
  if (userAlreadyExists) {
    return { status: 'UNSUCCESSFUL', message: 'User already registered' };
  }
  const newUser = await User.create({ displayName, email, password, image });
  return { status: 'SUCCESSFUL', newUser };
};

module.exports = {
  verifyCredentials,
  insert,
};