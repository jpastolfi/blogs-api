const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const validateJWT = async (req, res, next) => {
  const tokenWithBearer = req.headers.authorization;
  if (!tokenWithBearer) return res.status(401).json({ message: 'Token not found' });
  const [, token] = tokenWithBearer.split(' ');
  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded.data;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = { 
  validateJWT,
};