'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const blogPostsTable = queryInterface.createTable('blog_posts', {
      id: {
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      content: {
        type: Sequelize.STRING,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        }
      },
      published: {
        type: Sequelize.DATE,
      },
      updated: {
        type: Sequelize.DATE,
      },
    });
    return blogPostsTable;
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable('blogPostsTable');
  }
};
