const jwt = require("jsonwebtoken");

const generateAuthToken = (_id, name, lastName, email, isAdmin) => {
  // create a function to generate a token
  return jwt.sign(
    // return a signed token
    { _id, name, lastName, email, isAdmin }, // payload
    process.env.JWT_SECRET_KEY, // secret
    { expiresIn: "30d" } // expiration
  );
};

module.exports = generateAuthToken;
