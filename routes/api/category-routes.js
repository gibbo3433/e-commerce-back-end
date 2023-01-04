const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

// This will find all of the products in the entire category
router.get("/", async (req, res) => {
  try {
    // find all in the category
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
      // response showing the categoryData
    });
    res.status(200).json(categoryData);
    // catch if there is an error
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    // find a product in the in the category by its id value
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    // if no id exists, then send a message saying no category with that id!
    if (!categoryData) {
      res.status(404).json({ message: "No category with that id!" });
      return;
    }
    // response showing the categoryData
    res.status(200).json(categoryData);

    // catch if there is an error
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    // create a new category and require a body
    const categoryData = await Category.create(req.body);

    // response showing the categoryData
    res.status(200).json(categoryData);

    // catch if there is an error
  } catch (err) {
    res.status(500).json(err);
  }
});

// update a category by its id value
router.put("/:id", async (req, res) => {
  try {
    const categoryData = await Category.update(req.body, {
      // shows which id needs to be updated or changed
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(categoryData);

    // catch if there is an error
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a category by its id value
router.delete("/:id", async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      // shows which id needs to be updated or changed
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(categoryData);

    // catch if there is an error
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
