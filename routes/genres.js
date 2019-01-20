const Joi = require('Joi');
const express = require('express');
const router = express.Router();

const genres = [
    { id: 1, name: 'action' },
    { id: 2, name: 'thriller' },
    { id: 3, name: 'romance' },
    { id: 4, name: 'fiction' },
];

router.get('/', (req, res) => {
    // const genres = getGenres();
    res.send(genres);
});

router.get('/:id', (req, res) => {
    // Check if genre with :id exists
    const genre = findGenre(req.params.id);
    if (!genre) return res.status(404).send('Genre with this id not found');
    // Return genre with :id

    res.send(genre);
});

router.post('/', (req, res) => {
    // Validate
    // If invalid, return 400 - Bad request
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Add genre
    // Return added genre
    const genre = {
        id: genres.length + 1,
        name: req.body.name
    }
    genres.push(genre);
    res.send(genre);
});

router.put('/:id', (req, res) => {
    // Find genre if exists
    const genre = findGenre(req.params.id);
    if (!genre) return res.status(404).send('Genre with this id not found');
    
    // Validate
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Edit
    genre.name = req.body.name;
    res.send(genre);
});

router.delete('/:id', (req, res) => {
    // Find genre if exists
    const genre = findGenre(req.params.id);
    if (!genre) return res.status(404).send('Genre with this id not found');
    
    // Delete
    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    res.send(genre);
});

function findGenre(id) {
    return genres.find(g => g.id == id);
}

function validateGenre(genre) {
    const schema = {
        name: Joi.string().required()
    };
    
    return Joi.validate(genre, schema);
}

module.exports = router;