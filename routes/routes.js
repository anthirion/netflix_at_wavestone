const express = require('express');
const router = express.Router();

router.get('/get', (req, res) => {
    res.send('Get method')
})

router.post('/post', (req, res) => {
    res.send('Post method')
})

router.put('/put', (req, res) => {
    res.send('Put method')
})

module.exports = router;