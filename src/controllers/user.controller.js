const userService = require('../services/User.service');
const { generateToken } = require('../middlewares/generateToken');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const verification = await userService.verifyCredentials(email, password);
    if (!verification || verification.password !== password) {
      return res.status(400).json({ message: 'Invalid fields' });
    }
    const token = generateToken({ id: verification.id, name: verification.displayName });
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
  const { id } = insertedUser.newUser.dataValues;
  const token = generateToken({ id, name: displayName });
  return res.status(201).json({ token });
};

const findAll = async (req, res) => {
  const allUsers = await userService.findAll();
  return res.status(200).json(allUsers);
};

const findById = async (req, res) => {
  const id = Number(req.params.id);
  const selectedUser = await userService.findById(id);
  return res.status(200).json(selectedUser);
};

module.exports = {
  login,
  insert,
  findAll,
  findById,
};