const DB = require("../database");

const getAllFoods = async (req, res) => {
  try {
    const title = req.query.titleFilter || "";
    const filterType = req.query.filterType || "recent";
    let search = "SELECT * FROM foods";
    let params = [];
    if (title.length !== 0) {
      search = "SELECT * FROM foods WHERE title LIKE ?";
      params = [`%${title}%`];
    }

    switch (filterType) {
      case "most":
        search += " ORDER BY kcal DESC";
        break;
      case "least":
        search += " ORDER BY kcal ASC";
        break;
      case "recent":
      default:
        break;
    }

    const [response] = await DB.query(search, params);

    res
      .status(200)
      .json({ msg: "Successfully retrieved all foods", data: response });
  } catch (err) {
    res.status(404).json({ msg: err.message, status: "Error fetching foods" });
  }
};

const getSingleFood = async (req, res) => {
  try {
    const foodID = req.params.id;
    const [response] = await DB.query("SELECT * FROM foods WHERE foodID = ?", [
      foodID,
    ]);
    res
      .status(200)
      .json({ msg: "Successfully retrieved food", data: response });
  } catch (err) {
    res.status(404).json({ msg: err.message, status: "Error fetching food" });
  }
};

const createFood = async (req, res) => {
  try {
    const { title, kcal, protein, portion, category, ingredients } = req.body;
    const ingredientStr = JSON.stringify(ingredients);

    console.log("Creating food with data:", {
      title,
      kcal,
      protein,
      portion,
      category,
      ingredients,
    });

    await DB.query(
      "INSERT INTO foods (title, kcal, protein, portion, category, ingredients) VALUES (?, ?, ?, ?, ?, ?)",
      [title, kcal, protein, portion, category, ingredientStr]
    );
    res.status(200).json({ msg: "Successfully created new food" });
  } catch (err) {
    console.log("Error creating food:", err);
    res.status(500).json({ msg: err.message, status: "Error creating food" });
  }
};

const editFood = async (req, res) => {
  try {
    const { title, kcal, protein, portion, category } = req.body;
    const foodID = req.params.id;
    const [existingFood] = await DB.query(
      "SELECT * FROM foods WHERE foodID = ?",
      [foodID]
    );

    if (existingFood.length === 0) {
      return res.status(500).json({ msg: "No food found with that id" });
    } else {
      await DB.query(
        "UPDATE foods SET title = ?, kcal = ?, protein = ?, portion = ?, category = ? WHERE foodID = ?",
        [title, kcal, protein, portion, category, foodID]
      );

      res.status(200).json({ msg: "Successfully updated food" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error editing food" });
  }
};

const deleteFood = async (req, res) => {
  try {
    const foodID = req.params.id;
    await DB.query("DELETE FROM foods WHERE foodID = ?", [foodID]);
    res.status(200).json({ msg: "Successfully deleted food" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const filterFood = async (req, res) => {
  try {
    const searchVal = req.query.search;
    const [foods] = await DB.query("SELECT * FROM foods WHERE title LIKE ?", [
      `%${searchVal}%`,
    ]);
    res.status(200).json({ foods });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err.message });
  }
};

module.exports = {
  getAllFoods,
  createFood,
  editFood,
  getSingleFood,
  deleteFood,
  filterFood,
};
