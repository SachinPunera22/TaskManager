const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const User = require('../models/user.model')
const verifyToken = async (req, res, next) => {
  const authHeader =
    req.headers["Authorization"] || req.headers["authorization"];
  if (!authHeader) {
    const error = new AppError("Token Is Required!", 401);
    return next(error);
  }
  const token = authHeader.split(" ")[1];
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decodedToken._id);

    req.user =user
    next();
  } catch (err) {
    const error = new AppError("Invalid Token!", 401);
    return next(error);
  }
};

module.exports = verifyToken;
