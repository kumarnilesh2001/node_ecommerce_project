const categoryModel = require("../models/category.model");

exports.createCategory = async (req, res) => {
  const categoryObj = {
    name: req.body.name,
    description: req.body.description,
  };

  try {
    const category = await categoryModel.create(categoryObj);

    res.status(200).send(category);
  } catch (err) {
    console.log(`Error while creating the category ${err}`);
    res.status(500).send({
      message: `Error while creating the category body`,
    });
  }
};
