const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

// This will find all of the tags in the entire category
router.get("/", async (req, res) => {
  try {
    // find all function
    const tagData = await Tag.findAll({
      // added associated product data through the ProductTag junction table
      include: [{ model: Product, through: ProductTag}],

      // response showing the tagData
    });
    res.status(200).json(tagData);
    // catch if there is an error
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    // find a tag its id value
    const tagData = await Tag.findByPk(req.params.id, {
      // added associated product data through the ProductTag junction table
      include: [{ model: Product, through: ProductTag}],
    });

    // if no id exists, then send a message saying no tag with that id!
    if (!tagData) {
      res.status(404).json({ message: "No tag with that id!" });
      return;
    }
    // response showing the tagData
    res.status(200).json(tagData);

    // catch if there is an error
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    // create a new tag and require a body
    const tagData = await Tag.create(req.body);

    // response showing the tagData
    res.status(200).json(tagData);

    // catch if there is an error
  } catch (err) {
    res.status(500).json(err);
  }
});

// update a tag by its id value
router.put("/:id", async (req, res) => {
  try {
    const tagData = await Tag.update(req.body, {
      // shows which id needs to be updated or changed
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(tagData);

    // catch if there is an error
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a tag by its id value
router.delete("/:id", async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      // shows which id needs to be updated or changed
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(tagData);

    // catch if there is an error
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
