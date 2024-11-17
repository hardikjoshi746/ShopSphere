const jwt = require("jsonwebtoken");
const verifyIsLoggedIn = (req, res, next) => {
  // middleware function to verify if the user is logged in
  try {
    // try block
    const token = req.cookies.access_token; // get the token from the cookie
    if (!token) {
      // check if the token is not present
      return res // return a response
        .status(403)
        .send("You are not authorized to access this route"); // send a 403 status code
    }
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET_KEY); // decode the token
      req.user = decode; // set the user to the decoded token
      next();
    } catch (error) {
      return res.status(401).send("Unauthorized, Invalid token");
    }
    console.log(token);
  } catch (error) {
    next(error);
  }
};

const verifyIsAdmin = (req, res, next) => {
  console.log("Admin Check: ", req.user);
  if (req.user && req.user.isAdmin) {
    // check if the user is an admin
    next();
  } else {
    return res.status(401).send("Unauthorized admin required");
  }
};

module.exports = { verifyIsLoggedIn, verifyIsAdmin };
