const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Project = require("../models/project");

const bcrypt = require("bcrypt");
const verifyToken = require("../verifyToken");
const List = require("../models/list");
const Task = require("../models/task");

router.get("/",  async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/:id", verifyToken, async (req, res) => {
  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hashSync(req.body.password, salt);
    }

    const allowedFields = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: allowedFields },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    await Project.deleteMany({ userId: req.params.id });
    await List.deleteMany({ projectId: req.params.id });
    await Task.deleteMany({ listId: req.params.id });
    res.status(200).json({ message: "User has been deleted successfully" });
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

module.exports = router;
