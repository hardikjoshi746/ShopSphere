const User = require("../model/UserModel");
const { hashPassword } = require("../utils/hashPassword");

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select("-password"); // get all users and exclude the password field
    return res.json(users);
  } catch (error) {
    next(error);
  }
};

const registerUser = async (req, res, next) => {
  // New
  try {
    const { name, lastName, email, password } = req.body; // get the user data
    if (!name || !lastName || !email || !password) {
      // check if all fields are provided
      return res.status(400).json({ message: "All fields are required" }); // return an error if not
    }
    const userExists = await User.findOne({ email }); // check if the user already exists
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    } else {
      const hashedPassword = hashPassword(password); // hash the password
      const user = await User.create({
        name,
        lastName,
        email: email.toLowerCase(),
        password: hashPassword, // save the hashed password
      });
      return res.status(201).json({ message: "User created", user }); // return a success message
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { getUsers, registerUser };
