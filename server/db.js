const mongoose = require('mongoose');
const dbURL = process.env.DATABASE_URL;
const Serie = require('./data_models');
const fs = require('node:fs');

// Delete all existing data in the database
async function DeleteAllData(Model)
{
    console.log('Deleting all data in the database ...');
    await Model.collection.deleteMany({})
}

// Add the series from the corresponding json file
function AddData(Model)
{
    // Read the data from the json file
    console.log('Loading all data in the database ...');
    const json_series_file = "../data/series.json"
    fs.readFile(json_series_file, 'utf8', (err, data) => {
        if (err)    console.error(err);
        else {
            var series_data = JSON.parse(data);
            // Save the data in the database
            Model.collection.insertMany(series_data, (err) => {
                if(err)     console.log("Cannot create new serie: %s", err);
                else        console.log("Data of series has been successfully loaded");
            })
        }
    })
}

// Connect to the database, delete all the data and load the required data
async function connectDB()
{
    try 
    {
        const conn = await mongoose.connect(dbURL);
        console.log(`MongoDB Connected on ${conn.connection.host}`);
        // Delete all existing data before starting using the database
        DeleteAllData(Serie);
        // Add the data of the series automatically at the start
        AddData(Serie);
    } 
    catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

module.exports = connectDB;