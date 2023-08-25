const jwt = require('jsonwebtoken');
const userService = require('../services/User.service');

const secret = process.env.JWT_SECRET;

const validateCredentials = async (req, res) => {
  try {
    const { email, password } = req.body;
    const verification = await userService.verifyCredentials(email, password);
    if (!verification || verification.password !== password) {
      return res.status(400).json({ message: 'Invalid fields' });
    }
    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };
    const token = jwt.sign({ data: { userId: verification.id } }, secret, jwtConfig);
    return res.status(200).json({ token });
  } catch (e) {
    return res.status(500).json({ message: 'Erro interno', error: e.message });
  }
};

module.exports = {
  validateCredentials,
};