const express = require("express");
require("dotenv/config");
const app = express();

app.use(express.json()); // to parse JSON body

// Routes for CRUD Operations

// Database Setup
const connectDB = require("./db");

app.listen(PORT, (error) => {
  if (!error) console.log("Listening on port " + PORT);
  else console.log("Error occurred, server can't start", error);
});
