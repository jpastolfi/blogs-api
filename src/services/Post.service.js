const { BlogPost, Category, PostCategory } = require('../models');

const findAll = async () => {
  const allPosts = BlogPost.findAll();
  return allPosts;
};

const insert = async (userId, title, content, categoryIds) => {
  const allCategories = await Category.findAll();
  const allCategoriesIds = allCategories.map((category) => category.dataValues.id);
  if (!categoryIds.every((each) => allCategoriesIds.includes(each))) {
    return {
      status: 'UNSUCCESSFUL',
      message: 'one or more "categoryIds" not found',
    };
  }
  const { id, published, updated } = await BlogPost.create({ userId,
    title, 
    content,
  });
  await PostCategory.bulkCreate(
    categoryIds.map((categoryId) => ({ categoryId, postId: id })),
  );
  return {
    status: 'SUCCESSFUL', id, published, updated };
};

module.exports = {
  insert,
  findAll,
};