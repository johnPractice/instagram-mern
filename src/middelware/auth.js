const jwt = require("jsonwebtoken");
const { jwtKey } = require("../key");
const User = require("../model/user");
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = await jwt.verify(token, jwtKey);
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!user) return res.status(400).json({ error: "not found" });
    req.user = user;
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      error: "you must be loggin",
      login: false,
    });
  }
  next();
};
module.exports = auth;
