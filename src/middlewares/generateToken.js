const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;
const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '7d',
};

const generateToken = (payload) => {
  const token = jwt.sign(payload, secret, jwtConfig);
  return token;
};

module.exports = {
  generateToken,
};