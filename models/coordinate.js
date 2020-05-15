module.exports = function(sequelize, DataTypes) {
  var Coordinate = sequelize.define("Coordinate", {
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      len: [1, 9]
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    notes: {
      type: DataTypes.TEXT,
      validate: {
        len: [1]
      }
    }
  });

  Coordinate.associate = function(models) {
    // We're saying that a Post should belong to an User
    // A Post can't be created without an User due to the foreign key constraint
    Coordinate.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    Coordinate.belongsTo(models.Category, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Coordinate;
};
