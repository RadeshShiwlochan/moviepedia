'use strict';

const request = require('request');
const movieUtil = require('../utilities/movie-util');
const callOMDBApi = movieUtil.callOMDBApi;
const getMovie = movieUtil.getMovie;
const getPopMovies = movieUtil.getPopMovies;
const getMoviesInTheaters = movieUtil.getMoviesInTheaters;
const getMovieResults = movieUtil.getMovieResults;

exports.home = (req, res) => {
  getMoviesInTheaters.then((value) => {
    const moviesInTheaters = JSON.parse(value);
    res.render('../views/home', moviesInTheaters);
  }).catch((err) => {
    res.render('../views/error');
  });
};

exports.movieResults = (req, res) => {
  getMovieResults(req.body.searchItem).then((value) => {
    const searchResults = JSON.parse(value);
    res.render('../views/movie-results', searchResults);
  }).catch((err) => {
    res.render('../views/home');
  });
};

exports.movie = (req, res) => {
  getMoviesInTheaters.then((movieResults) => {
    return movieUtil.findMovieClickedObj(movieResults, req);
  }).
    then((movieClicked) => {
    return movieUtil.searchMovieClicked(movieClicked);
  }).
    then((value) => {
      const movieDataObject = JSON.parse(value);
      console.log(movieDataObject);
      res.render('../views/movie', movieDataObject);
  }) 
  .catch((error) => {
    reject(error);
  });
};  