const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

const hashPassword = (password) => bcrypt.hashSync(password, salt); // hash the password with bcrypt and the salt
const comparePassword = (
  inputPassword,
  hashedPassword // create a function to compare the password
) => bcrypt.compareSync(inputPassword, hashedPassword); // compare the password with the hashed password

module.exports = { hashPassword, comparePassword };
