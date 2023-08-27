const categoryService = require('../services/Category.service');

const insert = async (req, res) => {
  const { name } = req.body;
  const { id } = await categoryService.insert(name);
  return res.status(201).json({ id, name });
};

const findAll = async (req, res) => {
  const allCategories = await categoryService.findAll();
  return res.status(200).json(allCategories);
};

module.exports = {
  insert,
  findAll,
};