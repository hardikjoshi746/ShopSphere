const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

const hashPassword = (password) => bcrypt.hashSync(password, salt); // hash the password with bcrypt and the salt

module.exports = { hashPassword };
