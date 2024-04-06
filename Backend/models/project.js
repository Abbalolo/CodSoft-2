const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: generateRandomColor, 
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

function generateRandomColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16); // Generates a random number and converts it to hexadecimal string
}

module.exports = mongoose.model("Project", ProjectSchema);
