require('dotenv').config()
const cors = require('cors');
const express = require('express');
const connectDB = require('./db');
const MongoDBURL = process.env.DATABASE_URL;

// express
const app = express();
// body parser
app.use(express.json());
// const bodyParser = require("body-parser")
// app.use(bodyParser.urlencoded({ extended: true }));

// connect to database
connectDB(MongoDBURL);

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Build CRUD operations
const router = require('./routes');
const Serie = require('./data_models');
app.use('/netflix_at_wavestone', router);

// var newSerie = new Serie({
//     id: 1,
//     id_scriptwriter: 1,
//     episodes: [1, 2],
//     description: "This is the serie named Lupin"
// });

// // Save the new serie
// newSerie.save(function(err) {
//     if(err) {
//       console.log("Can't create new serie: %s", err);
//     }
// })