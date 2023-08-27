const { Category } = require('../models');

const insert = async (name) => {
  const newCategory = await Category.create({ name });
  return newCategory;
};

const findAll = async () => {
  const allCategories = await Category.findAll();
  return allCategories;
};

module.exports = {
  insert,
  findAll,
};