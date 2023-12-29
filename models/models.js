const mongoose = require('mongoose');

const serieSchema = new mongoose.Schema({
    id: {
        required: true,
        type: Number
    },
    age: {
        required: true,
        type: Number
    }
})

module.exports = mongoose.model('Data', dataSchema)