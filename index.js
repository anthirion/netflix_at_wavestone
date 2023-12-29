require('dotenv').config()

const mongoose = require('mongoose')
const mongoData = process.env.DATABASE_URL;

mongoose.connect(mongoData);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

// Create app
const express = require('express');
const app = express();
// Check if the app works
app.listen(4000, () => {
    console.log(`Server started at ${4000}`)
})
// Build CRUD operations
const routes = require('./routes/routes');
app.use('/netflix_at_wavestone', routes);