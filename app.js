require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const authRouter = require("./routes/auth");
const noteRouter = require("./routes/notes");
const verifyToken = require("./jwt");

const protectedRouter = require("./routes/protected");
const foodRouter = require("./routes/food");
// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
// routing
app.use("/auth", authRouter);
app.use("/notes", noteRouter);
app.use("/protected", verifyToken, protectedRouter);
app.use("/food", foodRouter);
app.listen(4000, () => console.log("server is running"));
