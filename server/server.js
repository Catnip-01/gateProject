const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const gateQuestion = require("./models/question");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    const dbName = process.env.MONGO_URI.split("/").pop().split("?")[0];
    console.log("MongoDB connected to database : " + dbName);
  })
  .catch((err) => console.log(err));

// Routes
app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

app.get("/test", async (req, res) => {
  try {
    const questions = await db.find({ year: year }); // Replace with a model you know exists
    res.json(questions);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/questions", async (req, res) => {
  try {
    const year = req.query.year; // Change this line to use req.query
    console.log("year  : " + year);
    const questions = await gateQuestion.find({ year: year }); // Fetch questions from the database
    console.log(JSON.stringify(questions));
    res.json(questions); // Send questions as JSON response
  } catch (err) {
    console.log("there is an error in the get request !");
    res.status(500).send(err); // Handle errors
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
