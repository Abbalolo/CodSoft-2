const express = require("express");
const router = express.Router();
const Task = require("../models/task");
const User = require("../models/user"); // Import User model if not already imported

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
router.post("/create", async (req, res) => {
  const {
    title,
    description,
    startDate,
    endDate,
    assignedTo,
    priority,
    status,
    projectId,
    listId,
  } = req.body;

  // Validate required fields
  if (
    !title ||
    !description ||
    !startDate ||
    !endDate ||
    !assignedTo ||
    !Array.isArray(assignedTo) || // Ensure assignedTo is an array
    assignedTo.length === 0 || // Ensure assignedTo array is not empty
    !priority ||
    !status ||
    !projectId || // Added missing comma here
    !listId // Added listId field
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if all assigned users exist
    const usersExist = await Promise.all(
      assignedTo.map(async (userId) => {
        const user = await User.findById(userId);
        return user !== null;
      })
    );

    if (usersExist.includes(false)) {
      return res
        .status(404)
        .json({ message: "One or more assigned users do not exist" });
    }

    const newTask = new Task({
      title,
      description,
      startDate,
      endDate,
      assignedTo,
      priority,
      status,
      projectId,
      listId, // Added listId here
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a task
router.patch("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    // Update each field individually
    if (req.body.title != null) task.title = req.body.title;
    if (req.body.description != null) task.description = req.body.description;
    if (req.body.startDate != null) task.startDate = req.body.startDate;
    if (req.body.endDate != null) task.endDate = req.body.endDate;
    if (req.body.assignedTo != null) task.assignedTo = req.body.assignedTo;
    if (req.body.priority != null) task.priority = req.body.priority;
    if (req.body.status != null) task.status = req.body.status;
    if (req.body.projectId != null) task.projectId = req.body.projectId;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get tasks by project ID
router.get("/project/:projectId", async (req, res) => {
  const projectId = req.params.projectId;

  try {
    const tasks = await Task.find({ projectId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get tasks by list ID
router.get("/list/:listId", async (req, res) => {
  const listId = req.params.listId;

  try {
    const tasks = await Task.find({ listId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a task
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await task.deleteOne();
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:taskId", async (req, res) => {
  const taskId = req.params.taskId;

  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
