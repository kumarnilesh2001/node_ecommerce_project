const userModal = require("../models/user.model");
const jwt = require("jsonwebtoken");
const secret = require("../configs/token.config");

const verifySignUp = async (req, res, next) => {
  if (!req.body.name) {
    return res.status(500).send({
      message: `Error ! Name Not Provided;`,
    });
  }
  if (!req.body.email) {
    return res.status(500).send({
      message: `Error ! Email Not Provided;`,
    });
  }
  if (!req.body.password) {
    return res.status(500).send({
      message: `Error ! Password Not Provided;`,
    });
  }
  if (!req.body.userId) {
    return res.status(500).send({
      message: `Error ! UserId Not Provided;`,
    });
  }

  const user = await userModal.findOne({ userId: req.body.userId });

  if (user) {
    return res.status(400).send({
      message: `User Already Exists;`,
    });
  }

  next();
};

const verifySignIn = (req, res, next) => {
  if (!req.body.userId) {
    return res.status(400).send({
      message: `UserId not Provided`,
    });
  }
  if (!req.body.password) {
    return res.status(400).send({
      message: `Password not Provided`,
    });
  }
  next();
};

const isValidToken = (req, res, next) => {
  const token = req.headers["z-access-token"];

  if (!token) {
    return res.status(401).send({
      message: `Error ! Please Provide Token`,
    });
  }

  jwt.verify(token, secret.secret, async (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: `Invalid Token`,
      });
    }

    const user = await userModal.findOne({ userId: decoded.Id });

    if (!user) {
      return res.status(401).send({
        message: `UnAuthorised , this user for this token doesnot exist !`,
      });
    }
    req.user = user;

    next();
  });
};

const isAdmin = async (req, res, next) => {
  const user = req.user;

  if (user && user.userType == "ADMIN") {
    next();
  } else {
    return res.status(401).send({
      message: "Only ADMIN users are allowed to access the end point",
    });
  }
};

module.exports = {
  verifySignUp: verifySignUp,
  verifySignIn: verifySignIn,
  isValidToken: isValidToken,
  isAdmin: isAdmin,
};
