const User = require("../model/UserModel");
const { hashPassword, comparePassword } = require("../utils/hashPassword");
const generateAuthToken = require("../utils/generateAuthToken");

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
      return res.status(400).send("All fields are required"); // return an error if not
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
        password: hashedPassword, // save the hashed password
      });
      return res
        .cookie(
          // set a cookie with the
          "access token", // name of the cookie
          generateAuthToken(
            // generate a token
            user._id,
            user.name,
            user.lastName,
            user.email,
            user.isAdmin
          ),
          {
            httpOnly: true, // set httponly to true
            secure: process.env.NODE_ENV === "production", // set secure to true in production
            sameSite: "strict", // set samesite to strict
          }
        )
        .status(201)
        .json({
          message: "User created",
          userCreated: {
            _id: user._id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            isAdmin: user.isAdmin,
          },
        }); // return a success message
    }
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password, doNotLogout } = req.body;
    if (!email || !password) {
      return res.status(400).send("All fields are required");
    }
    const user = await User.findOne({ email });
    if (user && comparePassword(password, user.password)) {
      // compare the password
      let cookieParams = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      };
      if (doNotLogout) {
        cookieParams = { ...cookieParams, maxAge: 1000 * 60 * 60 * 24 * 30 };
      }
      return res
        .cookie(
          "access token",
          generateAuthToken(
            user._id,
            user.name,
            user.lastName,
            user.email,
            user.isAdmin
          ),
          cookieParams
        )
        .json({
          success: "Login successful",
          userLoggedIn: {
            _id: user._id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            isAdmin: user.isAdmin,
            doNotLogout,
          },
        });
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { getUsers, registerUser, loginUser };
