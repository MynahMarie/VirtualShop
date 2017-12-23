const express = require('express');
const path = require('path');
const router = express.Router();

const home = require('./index');
const error = require('./error');

router.get('/', home.get);
router.use(error.client);
router.use(error.server);

module.exports = router;
