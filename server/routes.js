const express = require('express');
const Serie = require('./data_models');
const router = express.Router();

// Get all series
router.get('/series', async (req, res) => {
    try {
        const data = await Serie.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
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
        id_scriptwriter: req.body.id_scriptwriter,
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
router.patch('/series/:id', async (req, res) => {
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

// const router = require("express")
//     .Router()
// const controller = require('./controller')

// router
//     .post('/', controller.createSerie)
//     .get('/', controller.getSeries)
// module.exports = router