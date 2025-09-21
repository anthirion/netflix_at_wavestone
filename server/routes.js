const express = require('express');
const Serie = require('./data_models');
// const Scriptwriter = require('./data_models');
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
    "Dystopie",
];

/********************************************************************************
 * 
 * Health check endpoint
 * 
 **********************************************************************************/

router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'If you see this message, the API is working !',
    timestamp: new Date().toISOString()
  });
});


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
        // Get the requested NbEpisodes in the query
        const query_scriptwriter = req.query.scriptwriter || "";
        // Get the requested field for sort
        let request_sort = req.query.sort || "year";
        // Get the requested order of sort
        let request_orderBy = req.query.orderBy || "asc";
        // Get the requested serie genre in the query
		let genre = req.query.genre || "All";

        // If no genre is specified, search for all possible genre
        // If at least one genre is specified, get all the requested genre in an array
        genre === "All"
			? (genre = [...genreOptions])
			: (genre = req.query.genre.split(","));
            
            
        if (req.query.sort) {
            sort = req.query.sort.split(",")
        }
            
        // For the sort order, mongoose require -1 for descending order
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
        // Search the requested scriptwriter with a regexp search
        if (query_scriptwriter)
        {
            criteria.scriptwriter = { $regex: query_scriptwriter, $options: "i" }
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
        scriptwriter: req.body.scriptwriter,
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



/********************************************************************************
 * 
 * Endpoints related to scriptwriters resource
 * 
 **********************************************************************************/

// // Get all scriptwriters
// router.get('/scriptwriters', async (req, res) => {
//     try {
//         // Get the requested scriptwriter name in the query
//         const query_name = req.query.name || "";
//         // Get the requested surname in the query
//         const query_surname = req.query.surname || "";
//         // Get the requested nationality in the query
//         const query_nationality = req.query.nationality || "";
//         // Get the requested date of birth in the query
//         const query_date_of_birth = req.query.date_of_birth || "";
//         // Get the requested field for sort
//         let request_sort = req.query.sort || "date_of_birth";
//         // Get the requested order of sort
//         let request_orderBy = req.query.orderBy || "asc";

//         if (req.query.sort) {
//             sort = req.query.sort.split(",")
//         }
            
//         // For the sort order, mongoose require -1 for descending order
//         // and 1 for ascending order
//         let sortBy = {}
//         request_orderBy === "desc" ? sortBy[request_sort] = -1 : sortBy[request_sort] = 1

//         // Add all the search criteria requested by the user in the object criteria
//         // criteria can include the requested nationality and date of birth
//         let criteria = {}
//         let queries = [query_nationality, query_date_of_birth]
//         let filters = ["nationality", "date_of_birth"]

//         for (let i = 0; i < queries.length; i++)
//         {
//             if (queries[i]) {
//                 criteria[filters[i]] = queries[i]
//             }
//         }

//         // Search the requested name with a regexp search
//         if (query_name)
//         {
//             criteria.name = { $regex: query_name, $options: "i" }
//         }
//         // Search the requested surname with a regexp search
//         if (query_surname)
//         {
//             criteria.surname = { $regex: query_surname, $options: "i" }
//         }
        
//         // Get all series meeting the requested criteria, included in the criteria object
//         const scriptwriters = await Scriptwriter.find(criteria)
// 			.sort(sortBy)

//         // The response to send
//         const response = {
// 			error: false,
// 			scriptwriters
// 		};

//         res.status(200).json(response)
//     }
//     catch (error) {
//         res.status(500).json({ 
//             error: true,
//             message: error.message
//         })
//     }
// })

// // Get a scriptwriter by its id
// router.get('/scriptwriters/:id', async (req, res) => {
//     try {
//         const data = await Scriptwriter.findById(req.params.id);
//         res.json(data)
//     }
//     catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// })

// // Create a new scriptwriter
// router.post('/scriptwriters', async (req, res) => {
//     // Parse all the fields in the body sent by the user
//     const data = new Scriptwriter({
//         _id: req.body._id,
//         name: req.body.name,
//         surname: req.body.surname,
//         alive: req.body.alive,
//         nationality: req.body.nationality,
//         date_of_birth: req.body.date_of_birth,
//         series: req.body.series,
//     })

//     try {
//         const dataToSave = await data.save();
//         res.status(200).json(dataToSave)
//     }
//     catch (error) {
//         res.status(400).json({ message: error.message })
//     }
// })

// // Update by ID
// router.put('/scriptwriters/:id', async (req, res) => {
//     try {
//         const id = req.params.id;
//         const updatedData = req.body;
//         const options = { new: true };

//         const result = await Scriptwriter.findByIdAndUpdate(
//             id, updatedData, options
//         )

//         res.send(result)
//     }
//     catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// })

// // Delete a scriptwriter with its id
// router.delete('/scriptwriters/:id', async (req, res) => {
//     try {
//         const id = req.params.id;
//         const data = await Scriptwriter.findByIdAndDelete(id)
//         res.send(`Scriptwriter whose name is ${data.name} has been deleted..`)
//     }
//     catch (error) {
//         res.status(400).json({ message: error.message })
//     }
// })

// Export all the routes defined above
module.exports = router;