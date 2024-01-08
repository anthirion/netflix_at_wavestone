require('dotenv').config()
const cors = require('cors');
const express = require('express');
const connectDB = require('./db');
const MongoDBURL = process.env.DATABASE_URL;

// express setup
const app = express();
// body parser setup
app.use(express.json());

// connect to database and load all necessary data
connectDB(MongoDBURL);

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Implement all endpoints listed in routes.js file
const router = require('./routes');
app.use('/netflix_at_wavestone', router);