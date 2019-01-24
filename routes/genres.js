const { Genre, validate } = require('../models/genre');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

router.post('/', async (req, res) => {
    // Validate
    // If invalid, return 400 - Bad request
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Add genre
    // Return added genre
    let genre = new Genre({
        name: req.body.name
    });

    genre = await genre.save();
    res.send(genre);
});

router.put('/:id', async (req, res) => {
    // Validate
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    // FindAndUpdate
    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
        new: true
    });
    // If not found
    if (!genre) return res.status(404).send('Genre with this id not found');
    res.send(genre);
});

router.delete('/:id', async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if (!genre) return res.status(404).send('Genre with this id not found');
   res.send(genre);
});

router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    // Check if genre with :id exists
    if (!genre) return res.status(404).send('Genre with this id not found');
    // Return genre with :id
    res.send(genre);
});

function findGenre(id) {
    return genres.find(g => g.id == id);
}

module.exports = router;