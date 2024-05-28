const DB = require("../database");

const getUserInformation = async (req, res) => {
  try {
    const userID = req.user.userID;
    if (userID) {
      const [user] = await DB.query(
        "SELECT * FROM users INNER JOIN userInformation ON users.userID = userInformation.userID  WHERE users.userID = ?",
        [userID]
      );
      if (user.length > 0) {
        res.status(200).json({ msg: "welcome to the dashboard", user: user });
      } else {
        res.status(401).json({ msg: "user not found" });
      }
    } else {
      res.status(401).json({ msg: "userID not provided" });
    }
  } catch (err) {
    res.status(500).json({ msg: err, status: "internal server error" });
  }
};

module.exports = { getUserInformation };
