const jwt = require("jsonwebtoken");
const verifyIsLoggedIn = (req, res, next) => {
  next();
  return; // todo: remove this line to enable the middleware
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return res
        .status(403)
        .send("You are not authorized to access this route");
    }
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET_KEY); // decode the token
      req.user = decode;
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
  next();
  return; // todo: remove this line to enable
  if (req.user && req.user.isAdmin) {
    // check if the user is an admin
    next();
  } else {
    return res.status(401).send("Unauthorized admin required");
  }
};

module.exports = { verifyIsLoggedIn, verifyIsAdmin };
