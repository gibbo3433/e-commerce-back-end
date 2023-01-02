const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");

class Category extends Model {}

Category.init(
  {// new column named "id"
    id: {
      // data type must be a number
      type: DataTypes.INTEGER,
      // needs to be included
      allowNull: false,
      // allocates this a primary key
      primaryKey: true,
      // keeps auto adding one each time
      autoIncrement: true,
    },
    // new column named "category_name"
    category_name: {
      // data type is a string
      type: DataTypes.STRING,
      // needs to be included
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "category",
  }
);

module.exports = Category;
