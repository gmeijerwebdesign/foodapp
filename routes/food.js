const express = require("express");
const router = express.Router();

const {
  getAllFoods,
  createFood,
  editFood,
  getSingleFood,
  deleteFood,
  filterFood,
} = require("../controllers/food");

router.route("/").get(getAllFoods).post(createFood);
router.route("/filter").get(filterFood);
router.route("/:id").get(getSingleFood).put(editFood).delete(deleteFood);

module.exports = router;
