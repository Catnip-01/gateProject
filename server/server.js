const express = require("express");
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const cors = require("cors");
require("dotenv").config();
const gateQuestion = require("./models/question");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
// app.use(cors({ origin: "https://gate-project-dk5t.vercel.app" }));
app.use(express.json());

// MongoDB connection

const client = new MongoClient(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connectDB() {
  try {
    await client.connect();
    const dbName = process.env.MONGO_URI.split("/").pop().split("?")[0];
    console.log("mongoDb connecte to database : " + dbName);
    return client.db(dbName);
  } catch (err) {
    console.error("mongodb connection errror : " + error);
  }
}

const database = connectDB();

// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     const dbName = process.env.MONGO_URI.split("/").pop().split("?")[0];
//     console.log("MongoDB connected to database : " + dbName);
//   })
//   .catch((err) => console.log(err));

// Routes
app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

app.get("/test", async (req, res) => {
  try {
    const questions = await db.find({ year: 2021 }); // Replace with a model you know exists
    res.json(questions);
  } catch (err) {
    res.status(500).send("some error occured : " + err);
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
    const db = await database;
    const collection = db.collection("gatequestions");

    if (year) {
      console.log("entered year clause");
      // filteredQuestions = await gateQuestion.find({ year: year });
      filteredQuestions = await collection
        .find({ year: parseInt(year) })
        .toArray();
      console.log("request success : " + JSON.stringify(filteredQuestions));
      res.json(filteredQuestions);
    } else if (subject) {
      filteredQuestions = await collection.find({ subject }).toArray();
      res.json(filteredQuestions);
    } else {
      console.log("this is your req body : " + req.body);
    }
  } catch (err) {
    const { year, subject } = req.query;
    console.log("there is error, but your query body is : " + year);
    console.log("error while retrieving questions : " + err);
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
