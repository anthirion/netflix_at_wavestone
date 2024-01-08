const express = require('express');
const Serie = require('./data_models');
const router = express.Router();

// All the possible genres
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

/********************************************************************************
 * 
 * Endpoints related to series resource
 * 
 **********************************************************************************/

// Get all series
router.get('/series', async (req, res) => {
    try {
        // Get the requested serie name in the query
        const query_name = req.query.name || "";
        // Get the requested NbSeasons in the query
        const query_nb_seasons = req.query.nb_seasons || "";
        // Get the requested NbEpisodes in the query
        const query_nb_episodes = req.query.nb_episodes || "";
        // Get the requested NbEpisodes in the query
        const query_year = req.query.year || "";
        // Get the requested field for sort
        let request_sort = req.query.sort || "year";
        // Get the requested order of sort
        let request_orderBy = req.query.orderBy || "asc";
        // Get the requested serie genre in the query
		let genre = req.query.genre || "All";

        // if no genre is specified, search for all possible genre
        // if at least one genre is specified, get all the requested genre in an array
        genre === "All"
			? (genre = [...genreOptions])
			: (genre = req.query.genre.split(","));
            
            
        if (req.query.sort) {
            sort = req.query.sort.split(",")
        }
            
        // for the sort order, mongoose require -1 for descending order
        // and 1 for ascending order
        let sortBy = {}
        request_orderBy === "desc" ? sortBy[request_sort] = -1 : sortBy[request_sort] = 1

        // Add all the search criteria requested by the user in the object criteria
        // criteria can include the requested year, number of seasons or of episodes
        let criteria = {}
        let queries = [query_nb_seasons, query_nb_episodes, query_year]
        let filters = ["nb_seasons", "nb_episodes", "year"]

        for (let i = 0; i < queries.length; i++)
        {
            if (queries[i]) {
                criteria[filters[i]] = queries[i]
            }
        }

        // Search the requested name with a regexp search
        if (query_name)
        {
            criteria.name = { $regex: query_name, $options: "i" }
        }
        
        // Get all series meeting the requested criteria, included in the criteria object
        const series = await Serie.find(criteria)
			.where("genre")
			.in([...genre])
			.sort(sortBy)

        // The response to send
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
    // Parse all the fields in the body sent by the user
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

// Delete a serie with its id
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

// Export all the routes defined above
module.exports = router;