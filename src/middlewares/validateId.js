const User = require('../services/User.service');

const validateId = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const selectedUser = await User.findById(id);
    console.log(selectedUser);
    if (selectedUser === null) {
      return res.status(404).json({ message: 'User does not exist' });
    }
    next();
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: 'Deu ruim' });
  }
};

module.exports = {
  validateId,
};