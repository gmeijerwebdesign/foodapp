const express = require("express");
const router = express.Router();

const { getUserInformation } = require("../controllers/protected");

router.route("/").get(getUserInformation);

module.exports = router;
