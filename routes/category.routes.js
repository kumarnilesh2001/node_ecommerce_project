const categoryController = require("../controllers/category.controller");
const categoryMw = require("../middleware/category.mw");
const authMw = require("../middleware/auth.mw");

module.exports = (app) => {
  app.post(
    "/ecommerce_project/api/v1/auth/categories",
    [categoryMw.verifyCategory, authMw.isValidToken, authMw.isAdmin],
    categoryController.createCategory
  );
};
