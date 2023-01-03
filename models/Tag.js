const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");

class Tag extends Model {}

Tag.init(
  {
    // new column named id
    id: {
      // data type needs to be a number
      type: DataTypes.INTEGER,
      // needs to be included
      allowNull: false,
      // add the primary key to this value
      primaryKey: true,
      // keep adding on one after each additional tag
      autoIncrement: true,
    },
    // new column named tag_name
    tag_name: {
      // data type needs to be a string
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "tag",
  }
);

module.exports = Tag;
