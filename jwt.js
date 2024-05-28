const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ msg: "Authorization token not provided" });
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], "your_secret_key_here");
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};

module.exports = verifyToken;
