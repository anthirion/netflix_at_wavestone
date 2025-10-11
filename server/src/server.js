require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./db");
var bodyParser = require("body-parser");
const MongoDBURL = process.env.DATABASE_URL;

// express setup
const app = express();
// body parser setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// connect to database and load all necessary data
connectDB(MongoDBURL);

const PORT = 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Implement all endpoints listed in routes.js file
const router = require("./routes");
app.use("/netflix_at_wavestone", router);
