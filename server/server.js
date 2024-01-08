require('dotenv').config()
const cors = require('cors');
const express = require('express');
const connectDB = require('./db');
const fs = require('node:fs');
const MongoDBURL = process.env.DATABASE_URL;

// express
const app = express();
// body parser
app.use(express.json());

// connect to database
connectDB(MongoDBURL);

const PORT = 4000;
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Build CRUD operations
const router = require('./routes');
const Serie = require('./data_models');
app.use('/netflix_at_wavestone', router);


// Add the series automatically to the database
// Get the data from the json file
console.log(' Loading all data in the database ...');
const json_series_file = "../data/series.json"
fs.readFile(json_series_file, 'utf8', (err, data) => {
    if (err)    console.error(err);
    else {
        var series_data = JSON.parse(data);
        // Save the series in the mongodb database
        Serie.collection.insertMany(series_data, (err, r) => {
            if(err)     console.log("Cannot create new serie: %s", err);
            else        console.log("Data has been correctly loaded");
        })
    }
})

// Event triggered when CTRL + C is pressed
process.on('SIGINT', () => {
    // Delete all saved data in database
    console.log(' Deleting all data in the database ...');
});