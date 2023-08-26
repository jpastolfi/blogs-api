const jwt = require('jsonwebtoken');
const userService = require('../services/User.service');

const secret = process.env.JWT_SECRET;
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const validateCredentials = async (req, res) => {
  try {
    const { email, password } = req.body;
    const verification = await userService.verifyCredentials(email, password);
    if (!verification || verification.password !== password) {
      return res.status(400).json({ message: 'Invalid fields' });
    }
    const token = jwt.sign({ data: { userId: verification.id } }, secret, jwtConfig);
    return res.status(200).json({ token });
  } catch (e) {
    return res.status(500).json({ message: 'Erro interno', error: e.message });
  }
};

const insert = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const insertedUser = await userService.insert(displayName, email, password, image);
  if (insertedUser.status !== 'SUCCESSFUL') {
    return res.status(409).json({ message: 'User already registered' });
  }
  const token = jwt.sign({ data: { displayName } }, secret, jwtConfig);
  return res.status(201).json({ token });
};

module.exports = {
  validateCredentials,
  insert,
};