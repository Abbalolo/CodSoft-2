const express = require("express");
const router = express.Router();
const List = require("../models/list"); 
const Task = require("../models/task");

router.post("/create", async (req, res) => {
  try {
    const newList = new List(req.body);
    const savedList = await newList.save();
    res.status(200).json(savedList);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedList = await List.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      {
        new: true,
      }
    );
    res.status(200).json(updatedList);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleteList = await List.findByIdAndDelete(req.params.id);
    if (!deleteList) {
      return res.status(404).json({ message: "List not found" });
    }
  
    await Task.deleteMany({ listId: req.params.id });
    res
      .status(200)
      .json({ message: "List and associated tasks have been deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const lists = await List.find();
    res.status(200).json(lists);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/project/:projectId", async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const lists = await List.find({ projectId: projectId });
    res.status(200).json(lists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
