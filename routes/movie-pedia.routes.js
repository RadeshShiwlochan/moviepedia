const express = require('express');
const router = express.Router();
const mvpdiaContrlr = require('../controllers/movie-pedia.controller');

router.get('/home', mvpdiaContrlr.home);

module.exports = router;