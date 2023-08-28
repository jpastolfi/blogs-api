module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    content: {
      type: DataTypes.STRING,  
    },
    userId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
      references: {
        model: 'User',
        key: 'id',
      }
    },
    published: {
      type: DataTypes.DATE,
    },
    updated: {
      type: DataTypes.DATE,
    },
  }, {
    /* timestamps: false, */
    createdAt: 'published',
    updatedAt: 'updated',
    tableName: 'blog_posts',
    underscored: true,
  });
  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, {
      foreignKey: 'id', as: 'user',
    })
  }
  return BlogPost;
}