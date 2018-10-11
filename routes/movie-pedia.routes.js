const express = require('express');
const router = express.Router();
const mvpdiaContrlr = require('../controllers/movie-pedia.controller');

router.get('/home', mvpdiaContrlr.home);
router.get('/movie', mvpdiaContrlr.movie);

module.exports = router;