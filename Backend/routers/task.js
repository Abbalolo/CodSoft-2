const express = require("express");
const router = express.Router();
const Task = require("../models/task");

// Get all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a task
router.post("/", async (req, res) => {
  const task = new Task({
    title: req.body.title,
    description: req.body.description,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    assignedTo: req.body.assignedTo,
    priority: req.body.priority,
    status: req.body.status,
    projectId: req.body.projectId,
  });

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a task
router.patch("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (req.body.title != null) {
      task.title = req.body.title;
    }
    if (req.body.description != null) {
      task.description = req.body.description;
    }
    if (req.body.startDate != null) {
      task.startDate = req.body.startDate;
    }
    if (req.body.endDate != null) {
      task.endDate = req.body.endDate;
    }
    if (req.body.assignedTo != null) {
      task.assignedTo = req.body.assignedTo;
    }
    if (req.body.priority != null) {
      task.priority = req.body.priority;
    }
    if (req.body.status != null) {
      task.status = req.body.status;
    }
    if (req.body.projectId != null) {
      task.projectId = req.body.projectId;
    }

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.get("/project/:projectId", async (req, res) => {
  const projectId = req.params.projectId;

  try {
    const tasks = await Task.find({ projectId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Delete a task
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    await task.remove();
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
