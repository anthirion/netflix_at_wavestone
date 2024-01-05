const express = require('express');
const Serie = require('./data_models');
const router = express.Router();

const genreOptions = [
    "Drame",
    "Policier",
    "Thriller",
    "Action",
    "Politique",
    "Romance",
    "Fantaisie",
    "Crime",
    "Aventure",
    "Sci-fi",
    "Famille",
];

// Get all series
router.get('/series', async (req, res) => {
    try {
        // Implement search by name
        const query_name = req.query.name || "";
        // Implement search by NbSeasons
        const query_nb_seasons = req.query.nb_seasons || "";
        // Implement search by NbEpisodes
        const query_nb_episodes = req.query.nb_episodes || "";
        // Implement sort
        let sort = req.query.sort || "year";
        // Implement genre filtering
		let genre = req.query.genre || "All";

        
        genre === "All"
			? (genre = [...genreOptions])
			: (genre = req.query.genre.split(","));

		req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

        // Enable sort in ascending or descending order
        let sortBy = {};
		if (sort[1]) {
			sortBy[sort[0]] = sort[1];
		} else {
			sortBy[sort[0]] = "asc";
		}

        // A faire par une boucle for
        let criteria = {}

        // Cherche le nom de la série qui contient ce qui est passé dans le body
        if (query_name !== "")
        {
            criteria.name = { $regex: query_name, $options: "i" }
        }
        // Cherche la série dont le nb de saisons correspond au nombre passé dans le body 
        if (query_nb_seasons !== "")
        {
            criteria.nb_seasons = query_nb_seasons
        }
        // Cherche la série dont le nb d'épisodes correspond au nombre passé dans le body 
        if (query_nb_episodes !== "")
        {
            criteria.nb_episodes = query_nb_episodes
        }
        
        const series = await Serie.find(criteria)
			.where("genre")
			.in([...genre])
			.sort(sortBy)

        const response = {
			error: false,
			series,
		};

        res.status(200).json(response)
    }
    catch (error) {
        res.status(500).json({ 
            error: true,
            message: error.message
        })
    }
})

// Get a serie by its id
router.get('/series/:id', async (req, res) => {
    try {
        const data = await Serie.findById(req.params.id);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Create a new serie
router.post('/series', async (req, res) => {
    const data = new Serie({
        _id: req.body._id,
        name: req.body.name,
        id_scriptwriter: req.body.id_scriptwriter,
        year: req.body.year,
        genre: req.body.genre,
        nb_seasons: req.body.nb_seasons,
        nb_episodes: req.body.nb_episodes,
        episodes: req.body.episodes,
        description: req.body.description
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// Update by ID
router.put('/series/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Serie.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Delete a serie
router.delete('/series/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Serie.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router;