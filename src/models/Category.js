module.exports = (Sequelize, DataTypes) => {
  const Category = Sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    }
  }, {
    timestamps: false,
    tableName: 'categories',
    underscored: true,
  });
  return Category;
};