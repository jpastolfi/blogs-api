const validateEmail = (req, res, next) => {
  const emailRegex = /^(.+)@(.+)\.(.+)$/;
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Some required fields are missing' });
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid fields' });
  }
  next();
};

module.exports = { validateEmail };