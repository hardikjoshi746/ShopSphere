const bcrypt = require("bcryptjs");
const { Types } = require("mongoose");
const ObjectId = Types.ObjectId;

const users = [
  {
    name: "admin",
    lastName: "admin",
    email: "admin@admin.com",
    password: bcrypt.hashSync("admin@admin.com", 10),
    isAdmin: true,
  },
  {
    _id: ObjectId("6711a08c322b78e773c16f43"),
    name: "John",
    lastName: "Doe",
    email: "john@doe.com",
    password: bcrypt.hashSync("john@doe.com", 10),
  },
  {
    name: "hardik",
    lastName: "Joshi",
    email: "hardik21joshi@gmail.com",
    password: bcrypt.hashSync("hardik21joshi@gmail.com", 10),
    isAdmin: true,
  },
];

module.exports = users;
