const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const gateQuestion = require("./models/question");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: "https://gate-project-dk5t.vercel.app" }));
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
  console.log("request has reached us !");
  try {
    const { year, subject } = req.query;
    console.log(
      "year : " + year,
      "subject : " + subject,
      "query : " + JSON.stringify(req.query)
    );

    let filteredQuestions;

    if (year) {
      filteredQuestions = await gateQuestion.find({ year: year });
      res.json(filteredQuestions);
    } else if (subject) {
      filteredQuestions = await gateQuestion.find({ subject: subject });
      res.json(filteredQuestions);
    } else {
      console.log("this is your req body : " + req.body);
    }
  } catch (err) {
    console.log("error while retrieving questions : " + err);
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
