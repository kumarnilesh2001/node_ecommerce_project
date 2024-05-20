const authController = require("../controllers/auth.controller");
const authMw = require("../middleware/auth.mw");

module.exports = (app) => {
  app.post(
    "/ecommerce_project/api/v1/auth/signup",
    [authMw.verifySignUp],
    authController.SignUp
  );
  app.post(
    "/ecommerce_project/api/v1/auth/signin",
    [authMw.verifySignIn],
    authController.signIn
  );
};
