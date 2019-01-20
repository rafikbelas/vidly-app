const home = require('./routes/home');
const genres = require('./routes/genres');

const express = require('express');
const app = express();

app.use(express.json());
app.use('/', home);
app.use('/api/genres', genres);

const port = process.env.port || 5000
app.listen(port, () => console.log(`Listenning to port ${port}`));