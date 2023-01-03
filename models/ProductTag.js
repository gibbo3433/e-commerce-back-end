const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

class ProductTag extends Model {}

ProductTag.init(
  {
    // new column named id
    id: {
      // data type must be a number
      type: DataTypes.INTEGER,
      // needs to be included
      allowNull: false,
      // allocates that this is the primary key
      primaryKey: true,
      // keeps auto adding one each time      
      autoIncrement: true,
    },
    // new column named product_id
    product_id: {
      // data types needs to be a number
      type: DataTypes.INTEGER,
      // make sure to show the products id number also
      references: {
        model: "Product",
        key: "id",
      },
    },
    // new column named tag_id
    tag_id: {
      // data type needs to be number
      type: DataTypes.INTEGER,
      // make sure the inlcude the tag id number also
      references: {
        model: "Tag",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "product_tag",
  }
);

module.exports = ProductTag;
