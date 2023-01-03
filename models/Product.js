// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
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
    // new column named "product_name"
    product_name: {
      // data type must be a string
      type: DataTypes.STRING,
      // needs to be included
      allowNull: false,
    },
    // new column to show the price 
    price: {
      // data type must be a decimal
      type: DataTypes.DECIMAL,
      // needs to be included
      allowNull: false,
      // needs to make sure that a decimal is present
      validate: {
        isDecimal: true,
      }
    },
    // new column to show the amount of stock
    stock: {
      // data type must be a number
      type: DataTypes.INTEGER,
      // needs to be included
      allowNull: false,
      // start at 10 items
      defaultValue: 10,
      // needs to make sure that the amount is a number
      validate: {
        isNumeric: true,
      }
    },
    // new column to show the categories id number
    category_id: {
      // data type must be a number
      type: DataTypes.INTEGER,
      // make sure to show the products category id number also
      references: {
        model: 'Category',
        key: 'id',
      }
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
