const mongoose = require('mongoose');
const dbURL = process.env.DATABASE_URL;

async function connectDB()
{
    try {
        const conn = await mongoose.connect(dbURL);
        console.log(`MongoDB Connected on ${conn.connection.host}`);
    } 
    catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

module.exports = connectDB;