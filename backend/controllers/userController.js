const User = require("../model/UserModel");

const getUsers = (req, res) => {
  res.send("Hello from user controller");
};

module.exports = getUsers;
