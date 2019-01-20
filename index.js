const mongoose = require('mongoose');
const home = require('./routes/home');
const genres = require('./routes/genres');
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost/vidly-app')
    .then(() => console.log('Connected to vidly-app database'))
    .catch((err) => console.log('Error connecting to vidly-app database', err));


app.use(express.json());
app.use('/', home);
app.use('/api/genres', genres);

const port = process.env.port || 5000
app.listen(port, () => console.log(`Listenning to port ${port}`));