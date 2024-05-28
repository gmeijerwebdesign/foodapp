const express = require("express");
const router = express.Router();

const {
  GetAllNotes,
  CreateNewNote,
  DeleteNote,
} = require("../controllers/notes");

router.route("/").get(GetAllNotes).post(CreateNewNote);
router.route("/:noteID").delete(DeleteNote);

module.exports = router;
