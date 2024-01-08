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
    id_scriptwriter: {
        required: true,
        type: Number
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

const scriptwriterSchema = new Schema({
    _id: {
        required: true,
        type: Number
    },
    name: {
        required: true,
        type: String
    },
    surname: {
        required: true,
        type: String
    },
    alive: {
        required: true,
        type: Boolean
    },
    nationality: {
        required: true,
        type: String
    },
    date_of_birth: {
        required: true,
        type: Number
    },
    series: {
        required: true,
        type: [Number]
    }
})

const episodeSchema = new Schema({
    _id: {
        required: true,
        type: Number
    },
    id_serie: {
        required: true,
        type: Number
    },
    season: {
        required: true,
        type: Number
    },
    episode: {
        required: true,
        type: Number
    },
    description: {
        required: true,
        type: String
    },
    url: {
        required: true,
        type: String
    }
})

const Serie = model("Series", serieSchema)
module.exports = Serie
// const Scriptwriter = model('scriptwriters', scriptwriterSchema)
// module.exports = Scriptwriter
// const Episodes = model('episodes', episodeSchema)
// module.exports = Episodes