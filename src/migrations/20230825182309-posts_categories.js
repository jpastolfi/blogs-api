'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const postsCategoriesTable = await queryInterface.createTable('posts_categories', {
      post_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'blog_posts',
          key: 'id',
        },
        onDelete: 'CASCADE',
        primaryKey: true,
      },
      category_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'categories',
          key: 'id',
        },
        onDelete: 'CASCADE',
        primaryKey: true,
      },
    });
    return postsCategoriesTable;
  },
  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable('posts_categories')
  }
};
