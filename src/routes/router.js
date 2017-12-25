const express = require('express');
const router = express.Router();
const home = require('./../controllers/home');

router.get('/', home.home);
router.post('/login', home.login);
router.post('/newuser', home.newuser);

module.exports = router;
