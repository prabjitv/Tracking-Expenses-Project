module.exports = function(sequelize, DataTypes) {
  var Category = sequelize.define("Category", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1, 22]
    }
  });

  Category.associate = function(models) {
    // We're saying that a Post should belong to an User
    // A Post can't be created without an User due to the foreign key constraint
    Category.hasMany(models.Coordinate);
  };

  return Category;
};
