const winston = require('winston');
const express = require('express');
const app = express();

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();

const port = process.env.port || 5000
const server = app.listen(port, () => winston.info(`Listenning to port ${port}`));

module.exports = server;