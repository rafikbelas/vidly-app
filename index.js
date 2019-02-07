require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');
const error = require('./middleware/error');
const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const home = require('./routes/home');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const express = require('express');
const app = express();

// process.on('uncaughtException', (ex) => {
//     winston.error(ex.message, ex);
//     process.exit(1);
// });

winston.handleExceptions(
    new winston.transports.File({ filename: 'uncaughtExceptions.log' }));

process.on('unhandledRejection', (ex) => {
    throw ex;
});

winston.add(winston.transports.File, { filename: 'logfile.log' });
// winston.add(winston.transports.MongoDB, { 
//     db: 'mongodb://localhost/vidly-app',
//     level: 'error'
//     //if we set to info, it will log error, warn and info.
//     // error
//     // warn
//     // info
//     // verbose
//     // debug
//     // silly
// });

// throw new Error('Faking an error');

const p = Promise.reject(new Error('Something failed miserabely!'));
p.then(() => console.log('Done'));

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined');
    process.exit(1);
}

mongoose.connect('mongodb://localhost/vidly-app')
    .then(() => console.log('Connected to vidly-app database'))
    .catch((err) => console.log('Error connecting to vidly-app database', err));

app.use(express.json());
app.use('/', home);
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

app.use(error);

const port = process.env.port || 5000
app.listen(port, () => console.log(`Listenning to port ${port}`));