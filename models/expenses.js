module.exports = function (sequelize, DataTypes) {
  var Expense = sequelize.define("Expense", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    category: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      len: [1, 9]
    },
    timeStamp: {
      type: DataTypes.DATE
    }
  });

  Expense.associate = function (models) {
    // We're saying that a Post should belong to an User
    // A Post can't be created without an User due to the foreign key constraint
    Expense.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Expense;
};
