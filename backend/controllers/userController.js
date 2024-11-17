const User = require("../model/UserModel");
const Review = require("../model/ReviewModel");
const Product = require("../model/ProductModel");
const { hashPassword, comparePassword } = require("../utils/hashPassword");
const generateAuthToken = require("../utils/generateAuthToken");

const getUsers = async (req, res, next) => {
  try {
    console.log("Admin Access: ", req.user);
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
          "access_token", // name of the cookie
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
            doNotLogout,
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
    const user = await User.findOne({ email }).orFail(); // get the user by email
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
          "access_token",
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

const updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).orFail(); // get the user by id
    user.name = req.body.name || user.name; // update the user data
    user.lastName = req.body.lastName || user.lastName;
    user.phoneNumber = req.body.phoneNumber;
    user.address = req.body.address;
    user.country = req.body.country;
    user.zipCode = req.body.zipCode;
    user.city = req.body.city;
    user.state = req.body.state;
    if (req.body.password != user.password) {
      // check if the password is different
      user.password = hashPassword(req.body.password);
    }

    user.save(); // save the updated user data
    return res.json({
      success: "User updated",
      userUpdated: {
        _id: user._id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        address: user.address,
        country: user.country,
        zipCode: user.zipCode,
        city: user.city,
        state: user.state,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).orFail(); // get the user by id
    return res.send(user);
  } catch (error) {
    next(error);
  }
};
const writeReview = async (req, res, next) => {
  try {
    const session = await Review.startSession(); // start a session

    const { comment, rating } = req.body; // get comment and rating from request body
    if (!(comment && rating)) {
      // check if comment and rating are provided
      return res
        .status(400)
        .json({ message: "Comment and rating are required" });
    }
    const objectId = require("mongoose").Types.ObjectId;
    let reviewId = objectId();
    session.startTransaction(); // start a transaction
    await Review.create(
      [
        // create a review
        {
          _id: reviewId,
          comment: comment,
          rating: Number(rating),
          user: {
            // set the user data
            _id: req.user._id,
            name: req.user.name + " " + req.user.lastName,
          },
          product: req.params.productId, // set the product id
        },
      ],
      { session: session }
    );
    const product = await Product.findById(req.params.productId)
      .populate("reviews")
      .session(session); // get the product by id and populate the reviews
    const alreadyReviewed = product.reviews.find(
      (r) => r.user._id.toString() === req.user._id.toString()
    ); // check if the user already reviewed the product
    if (alreadyReviewed) {
      await session.abortTransaction(); // abort the transaction
      session.endSession(); // end the session
      return res.status(400).json({ message: "Product already reviewed" });
    }

    let prc = [...product.reviews]; // spread the reviews
    prc.push({ rating: rating });
    product.reviews.push(reviewId); // push the review id to the product reviews
    if (product.reviews.length === 1) {
      // check if the product has no reviews
      product.rating = Number(rating); // set the rating
      product.reviewsNumber = 1; // set the reviews number
    } else {
      product.reviewsNumber === product.reviews.length; // check if the reviews number is equal to the reviews length
      product.rating =
        prc
          .map((item) => Number(item.rating))
          .reduce((sum, item) => sum + item, 0) / product.reviews.length; // calculate the rating by summing all the ratings and dividing by the reviews length
    }
    await product.save(); // save the product
    await session.commitTransaction(); // commit the transaction
    session.endSession(); // end the session
    res.send("Review added successfully"); // return a success message
  } catch (error) {
    await session.abortTransaction(); // abort the transaction
    session.endSession(); // end the session
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id) // get the user by id
      .select("name lastName email isAdmin") // select the fields to return
      .orFail(); // get the user by id
    return res.send(user);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).orFail(); // get the user by id

    user.name = req.body.name || user.name; // update the user data
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin || user.isAdmin;

    await user.save(); // save the updated user data
    res.send("User updated successfully"); // return a success message
  } catch (error) {
    next(error);
  }
};
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).orFail(); // get the user by id
    await user.remove(); // remove the user
    res.send("User removed"); // return a success message
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  registerUser,
  loginUser,
  updateUserProfile,
  getUserProfile,
  writeReview,
  getUser,
  updateUser,
  deleteUser,
};
