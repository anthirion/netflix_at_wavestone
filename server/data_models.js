const { Schema, model } = require("mongoose");

const serieSchema = new Schema({
    _id: {
        required: true,
        type: Number
    },
    id_scriptwriter: {
        required: true,
        type: Number
    },
    genres: {
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
// module.exports = model('scriptwriters', scriptwriterSchema)
// module.exports = model('episodes', episodeSchema)