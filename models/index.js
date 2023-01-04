// import models
const Product = require("./Product");
const Category = require("./Category");
const Tag = require("./Tag");
const ProductTag = require("./ProductTag");

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: "Category_id",
});

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: "Category_id",
  // // When we delete a product, make sure to also delete the associated data
  onDelete: "CASCADE",
});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  // makes it go through the ProductTag junction table
  through: ProductTag,
  // as: 'product_Tags'
  foreignKey: "product_id",
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  // makes it go through the ProductTag junction table
  through: ProductTag,
  // as: 'product_Tags'
  foreignKey: "tag_id",
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
