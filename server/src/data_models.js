const { Schema, model } = require("mongoose");

const serieSchema = new Schema({
    _id: {
        required: true,
        type: Number
    },
    name: {
        required: true,
        type: String
    },
    scriptwriter: {
        required: true,
        type: String
    },
    year: {
        required: true,
        type: Number
    },
    genre: {
        required: true,
        type: [String]
    },
    nb_seasons: {
        required: true,
        type: Number
    },
    nb_episodes: {
        required: true,
        type: Number
    },
    episodes: {
        required: true,
        type: [Number]
    },
    description: {
        required: true,
        type: String
    },
})

const Serie = model("Series", serieSchema)
module.exports = Serie