const express = require('express');
const routerError = express.Router();

const error = require('./../controllers/error');

routerError.use(error.client);
routerError.use(error.server);

module.exports = routerError;
