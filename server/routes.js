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
        // Implement search by NbEpisodes
        const query_year = req.query.year || "";
        // Implement sort
        let request_sort = req.query.sort || "year";
        // Implement the order of sort
        let request_orderBy = req.query.orderBy || "asc";
        // Implement genre filtering
		let genre = req.query.genre || "All";

        
        genre === "All"
			? (genre = [...genreOptions])
			: (genre = req.query.genre.split(","));
            
            
        // si le champ sort n'est pas vide, on met sépare les champs dans un array
        if (req.query.sort) {
            sort = req.query.sort.split(",")
        }
            
        // pour l'ordre du tri, il faut faire correspondre "desc" à -1
        // et "asc" à 1
        let sortBy = {}
        request_orderBy === "desc" ? sortBy[request_sort] = -1 : sortBy[request_sort] = 1

        // Ajoute les critères de recherches de l'url dans l'objet criteria
        let criteria = {}
        let queries = [query_nb_seasons, query_nb_episodes, query_year]
        let filters = ["nb_seasons", "nb_episodes", "year"]

        for (let i = 0; i < queries.length; i++)
        {
            if (queries[i]) {
                criteria[filters[i]] = queries[i]
            }
        }

        // Cherche le nom de la série qui contient ce qui est passé dans le body
        // Le nom est traité à part car on fait une recherche basée sur regexp
        if (query_name)
        {
            criteria.name = { $regex: query_name, $options: "i" }
        }
        
        const series = await Serie.find(criteria)
			.where("genre")
			.in([...genre])
			.sort(sortBy)

        const response = {
			error: false,
			series
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
        res.send(`Serie whose name is ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router;