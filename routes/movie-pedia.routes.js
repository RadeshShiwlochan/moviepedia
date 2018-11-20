const express = require('express');
const router = express.Router();
const mvpdiaContrlr = require('../controllers/movie-pedia.controller');

router.get('/home', mvpdiaContrlr.home);
router.get('/movie/:title/:id', mvpdiaContrlr.movie);
router.post('/movie-search-results', mvpdiaContrlr.movieResults);

module.exports = router;