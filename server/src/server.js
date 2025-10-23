require("dotenv").config();
const express = require("express");
const connectDB = require("./db");
var bodyParser = require("body-parser");
const MongoDBURL = process.env.DATABASE_URL;

const app = express();
// body parser setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

connectDB(MongoDBURL);

const PORT = 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const router = require("./routes");
app.use("/netflix_at_wavestone", router);