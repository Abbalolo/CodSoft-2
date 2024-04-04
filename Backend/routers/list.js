const express = require("express");
const router = express.Router();
const List = require("../models/List");
const Comment = require("../models/comment");
const verifyToken = require("../verifyToken");

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

router.delete("/:id",  async (req, res) => {
  try {
    const deleteList = await List.findByIdAndDelete(req.params.id);
    if (!deleteList) {
      return res.status(404).json({ message: "Post not found" });
    }
    // await Comment.deleteMany({ postId: req.params.id });
    res
      .status(200)
      .json({ message: "Post and associated comments have been deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// router.get("/:id", async (req, res) => {
//   try {
//     const project = await Project.findById(req.params.id);
//     if (!project) {
//       res.status(404).json({ message: "Post not found" });
//       return;
//     }
//     res.status(200).json(project);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get("/", async (req, res) => {
  try {
    const project = await Project.find();
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get("/user/:userId", async (req, res) => {
//   try {
//     const list = await List.find({ userId: req.params.userId });
//     res.status(200).json(list);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

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
