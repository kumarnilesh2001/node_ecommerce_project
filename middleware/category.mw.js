const categoryModel = require("../models/category.model");

const verifyCategory = async (req, res, next) => {
  if (!req.body.name) {
    return res.status(500).send({
      message: "Name is required",
    });
  }
  if (!req.body.description) {
    return res.status(500).send({
      message: "Description is required",
    });
  }

  try {
    const category = await categoryModel.findOne({ name: req.body.name });

    if (category) {
      return res.status(400).json({ message: "Category already exists." });
    }
  } catch (err) {
    console.log(`Error while finding the category ${err}`);
  }
  next();
};

module.exports = {
  verifyCategory: verifyCategory,
};
