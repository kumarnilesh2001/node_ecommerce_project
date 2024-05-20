const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const port = require("./configs/port.config");
const db_url = require("./configs/db.config");
const userModal = require("./models/user.model");

//executing the express on app
const app = express();
app.use(express.json());

//connecting to the DB
mongoose.connect(db_url.DB_url);

//starting the DB
const db = mongoose.connection;

// if the db base is no conntect
db.on("error", (err) => {
  console.log("Error in DB connection", err);
});

// if the database is connected
db.once("open", () => {
  console.log("Connection to the DB is successful");
  init();
});

// starting the app or the server
app.listen(port.PORT, () => {
  console.log(`Server has been started on port : ${port.PORT}`);
});

/**
 *   In init fun we have to find the UserType : Admin is present or not in h db ,if it it is already in the database we return
 *
 * */
async function init() {
  try {
    // First we check is there any admin present or no
    let user = await userModal.findOne({ userType: "ADMIN" });

    // if ADMIN present
    if (user) {
      console.log("Admin is already present in the database");
      return;
    }
  } catch (err) {
    console.log(`Error while finding the User ${err}`);
  }

  try {
    // if ADMIN is not present in the database
    user = await userModal.create({
      name: "Nilesh kumar banara",
      email: "nileshkumarbanara@gmail.com",
      password: bcrypt.hashSync("Nilesh@123", 8),
      userId: "admin",
      userType: "ADMIN",
    });

    console.log(`Admin has been created ${user}`);
  } catch (err) {
    console.log(`Error while creating Admin ${err}`);
  }
}

require("./routes/auth.routes")(app);
require("./routes/category.routes")(app);
