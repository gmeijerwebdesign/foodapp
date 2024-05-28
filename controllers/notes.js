const DB = require("../database");

const GetAllNotes = async (req, res) => {
  try {
    const { userID } = req.query;
    const [notes] = await DB.query("SELECT * FROM notes WHERE userID = ?", [
      userID,
    ]);
    res.status(200).json({ notes: notes });
  } catch (err) {
    console.log(err);
    res.status(404).json({ msg: err });
  }
};

const DeleteNote = async (req, res) => {
  try {
    const noteID = req.params.noteID;
    console.log(noteID);
    await DB.query("DELETE FROM notes WHERE noteID = ?", [noteID]);
    res.status(200).json({ msg: "succesfully deleted note" });
  } catch (err) {
    console.log(err);
    res.status(403).json({ msg: err });
  }
};

const CreateNewNote = async (req, res) => {
  try {
    const { dateTimeString, txt, userID } = req.body;
    console.log(dateTimeString);
    await DB.query("INSERT INTO notes (date,txt,userID) VALUES (?,?,?)", [
      dateTimeString,
      txt,
      userID,
    ]);
    res.status(200).json({ msg: "succesfully made new notes" });
  } catch (err) {
    console.log(err);
    res.status(404).json({ msg: err });
  }
};

module.exports = { GetAllNotes, CreateNewNote, DeleteNote };
