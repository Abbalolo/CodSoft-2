const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const port = process.env.PORT || 5000;
const authRouter = require("./routers/auth");
const userRouter = require("./routers/users");
const taskRouter = require("./routers/task");
const ProjectRouter = require("./routers/project");
const ListRouter = require("./routers/list");

require("dotenv").config();

const api = process.env.API_URL;

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Database connected successfully");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

// Middleware to parse JSON data
app.use(express.json());

// Serve static files from the 'images' directory
app.use("/images", express.static(path.join(__dirname, "images")));

// Configure CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://codsoft-project-managment.netlify.app",
    ],
    credentials: true,
  })
);

// Parse cookies
app.use(cookieParser());

// Middleware for logging HTTP requests
app.use(morgan("tiny"));

// Routes
app.use(`${api}/auth`, authRouter);
app.use(`${api}/users`, userRouter);
app.use(`${api}/projects`, ProjectRouter);
app.use(`${api}/lists`, ListRouter);
app.use(`${api}/tasks`, taskRouter);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.img);
  },
});

const upload = multer({ storage: storage });

// Handle file uploads
app.post(`${api}/upload`, upload.single("file"), (req, res) => {
  res.status(200).json({ message: "Image has been uploaded successfully" });
});

// Start the server
app.listen(port, () => {
  connectDb();
  console.log("Server has started on port", port);
});
