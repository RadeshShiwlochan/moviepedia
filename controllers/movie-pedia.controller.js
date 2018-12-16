'use strict';

const request = require('request');
const movieUtil = require('../utilities/movie-util');
const callOMDBApi = movieUtil.callOMDBApi;
const getPopMovies = movieUtil.getPopMovies;
const getMoviesInTheaters = movieUtil.getMoviesInTheaters;
const getMovieResults = movieUtil.getMovieResults;
const validateMoviesInTheatersData = movieUtil.validateMoviesInTheaterData;

exports.home = (req, res) => {
  getMoviesInTheaters().then((value) => {
    const moviesInTheaters = JSON.parse(value);
    const validateMovies = validateMoviesInTheatersData(moviesInTheaters.results);
    moviesInTheaters.results = validateMovies;
    res.render('../views/home', moviesInTheaters);
  }).catch((err) => {
    res.render('../views/error');
  });
};

exports.movieResults = (req, res) => {
  getMovieResults(req.body.searchItem).then((value) => {
    const searchResults = JSON.parse(value);
    console.log(searchResults);
    res.render('../views/movie-results', searchResults);
  }).catch((err) => {
    res.render('../views/home');
  });
};

exports.movie = (req, res) => {
  const movieClicked = movieUtil.findMovieClickedObj(req);
  console.log(movieClicked);
  movieUtil.searchMovieClicked(movieClicked).
    then((value) => {
    console.log("in then")  
    const movieDataObject = JSON.parse(value);
    res.render('../views/movie', movieDataObject);
  }).catch((error) => {
    reject(error);
  });
};  