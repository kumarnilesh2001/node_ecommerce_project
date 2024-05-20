const bcrypt = require("bcryptjs");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const secret = require("../configs/token.config");

exports.SignUp = async (req, res) => {
  // 1. read the request body

  const reqBody = req.body;

  // 2.store the request body on the object

  const userObj = {
    name: reqBody.name,
    email: reqBody.email,
    userId: reqBody.userId,
    password: bcrypt.hashSync(reqBody.password, 8),
    userType: reqBody.userType,
  };

  try {
    const userObject = await userModel.create(userObj);

    res.status(201).send(userObject);
  } catch (err) {
    console.log(`Error while resistering the user : ${err}`);
    res.status(500).send({
      message: "Some error happens while registering the user; ",
    });
  }
};

exports.signIn = async (req, res) => {
  try {
    const user = await userModel.findOne({ userId: req.body.userId });

    if (!user) {
      return res.status(500).send({
        message: `Unauthorised ! UserId is not present in the database ; `,
      });
    }

    const isPasswordValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(500).send({
        message: `Unauthorised ! Invalid password ;`,
      });
    }

    const token = jwt.sign({ Id: user.userId }, secret.secret, {
      expiresIn: 120,
    });

    const userObj = {
      userId: user.userId,
      name: user.name,
      email: user.email,
      password: user.password,
      userType: user.userType,
      token: token,
    };

    res.status(201).send(userObj);
  } catch (err) {
    console.log(`Error while finding the user : ${err}`);
  }
};
