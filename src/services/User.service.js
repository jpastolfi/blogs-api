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

const findAll = async () => {
  const allUsers = await User.findAll({
    attributes: { exclude: ['password'] },
  });
  return allUsers;
};

const findById = async (id) => {
  const selectedUser = await User.findOne({
    where: { id },
    attributes: { exclude: ['password'] },
  });
  return selectedUser;
};

module.exports = {
  verifyCredentials,
  insert,
  findAll,
  findById,
};