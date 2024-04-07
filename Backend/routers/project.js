const express = require("express");
const router = express.Router();
const Project = require("../models/project");
const verifyToken = require("../verifyToken");
const List = require("../models/list");

router.post("/create",  async (req, res) => {
  try {
    const newProject = new Project(req.body);
    const savedProject = await newProject.save();
    res.status(200).json(savedProject);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

router.put("/:id",  async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      {
        new: true,
      }
    );
    res.status(200).json(updatedProject);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

router.delete("/:id",  async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) {
      return res.status(404).json({ message: "Post not found" });
    }
    await List.deleteMany({ postId: req.params.id });
    await Task.deleteMany({ postId: req.params.id });
    res
      .status(200)
      .json({ message: "Post and associated comments have been deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      res.status(404).json({ message: "Post not found" });
      return;
    }
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const project = await Project.find();
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const project = await Project.find({ userId: req.params.userId });
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
