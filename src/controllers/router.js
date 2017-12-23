const express = require('express');
const path = require('path');
const router = express.Router();

const home = require('./index');
const error = require('./error');
// const users = require('./users');

router.get('/', home.get);
// router.get('/users', users.get);
router.use(error.client);
router.use(error.server);

module.exports = router;
