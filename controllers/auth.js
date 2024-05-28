const bcrypt = require("bcrypt");
const DB = require("../database");
const jwt = require("jsonwebtoken");

const Register = async (req, res) => {
  try {
    const { username, password, kcal, protein } = req.body;

    if (!username || !password || !kcal || !protein) {
      return res.status(401).json({ msg: "Please fill in all forms" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await DB.query(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      [username, hashedPassword]
    );

    const user_ID = user[0].insertId;

    await DB.query(
      "INSERT INTO userInformation (kcal, protein, userID) VALUES (?, ?, ?)",
      [kcal, protein, user_ID]
    );

    res.status(200).json({
      msg: "Successfully registered user",
      userId: user_ID,
    });
  } catch (err) {
    res
      .status(404)
      .json({ msg: err.message, status: "Error registering user" });
    console.log(err);
  }
};

const Login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const [user] = await DB.query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);

    if (user.length === 0) {
      res.status(401).json({ msg: "No user with this username" });
      return;
    }

    const isPasswordMatch = await bcrypt.compare(password, user[0].password);
    if (!isPasswordMatch) {
      res.status(401).json({ msg: "Invalid username or password" });
      return;
    }

    const userID = user[0].userID;
    const token = jwt.sign({ userID }, "your_secret_key_here", {
      expiresIn: "1h",
    });
    res.status(200).json({ msg: "Successfully logged in", token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal server error" });
  }
};

module.exports = { Login, Register };
