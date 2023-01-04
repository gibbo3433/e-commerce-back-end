const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// The `/api/products` endpoint

// This will find all of the products
router.get("/", async (req, res) => {
  try {
    // find all function
    const productData = await Product.findAll({
      // added associated category model and product data through the ProductTag junction table
      include: [
        { model: Category },
        { model: Tag, through: ProductTag, as: "productTags" },
      ],

      // response showing the productData
    });
    res.status(200).json(productData);
    // catch if there is an error
  } catch (err) {
    res.status(500).json(err);
  }
});

// this will get one product
router.get("/:id", async (req, res) => {
  try {
    // find a product its id value
    const productData = await Product.findByPk(req.params.id, {
      // added associated category model and product data through the ProductTag junction table
      include: [
        { model: Category },
        { model: Tag, through: ProductTag, as: "productTags" },
      ],
    });

    // if no id exists, then send a message saying no product with that id!
    if (!productData) {
      res.status(404).json({ message: "No product with that id!" });
      return;
    }
    // response showing the productData
    res.status(200).json(productData);

    // catch if there is an error
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new product
router.post("/", (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Football",
      price: 100.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put("/:id", (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

// delete a product by its id value
router.delete("/:id", async (req, res) => {
  try {
    const productData = await Product.destroy({
      // shows which id needs to be updated or changed
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(productData);

    // catch if there is an error
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
