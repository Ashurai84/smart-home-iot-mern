const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token) {
      return res.status(401).send({ message: "No token provided" });
    }

    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userid;
    next();
  } catch (err) {
    console.log("JWT ERROR:", err.message);
    res.status(401).send({ message: "Invalid token" });
  }
}; 

module.exports = auth;
