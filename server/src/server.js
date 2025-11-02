require("dotenv").config();
const express = require("express");
const connectDB = require("./db");
var bodyParser = require("body-parser");
const MongoDBURL = process.env.DATABASE_URL;

// Configure app
const app = express();
// body parser setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configure logger
var morgan = require('morgan');
app.use(morgan("tiny"));

connectDB(MongoDBURL);

const PORT = 80;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const router = require("./routes");
app.use("/", router);