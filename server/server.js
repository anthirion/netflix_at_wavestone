require('dotenv').config()
const cors = require('cors');
const express = require('express');
const connectDB = require('./db');
const MongoDBURL = process.env.DATABASE_URL;

// express
const app = express();
// body parser
app.use(express.json());

// connect to database
connectDB(MongoDBURL);

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Build CRUD operations
const router = require('./routes');
const Serie = require('./data_models');
app.use('/netflix_at_wavestone', router);



// Add a new serie automatically to the database
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