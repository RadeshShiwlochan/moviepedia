const request = require('request');
const movieUtil = require('../utilities/movie-util');
const callOMDBApi = movieUtil.callOMDBApi;
const getMovie = movieUtil.getMovie;
const getPopMovies = movieUtil.getPopMovies;
const getMoviesInTheaters = movieUtil.getMoviesInTheaters;

exports.home = (req, res) => {
  getMoviesInTheaters.then(function(value) {
  const moviesInTheaters = JSON.parse(value);
  res.render('../views/home', moviesInTheaters);
  }).catch(function(err) {
    res.render('../views/error');
  });
};

exports.movie = (req, res) => {
  res.render('../views/home');
};

exports.movieResults = (req,res) => {
  res.render('../views/movie-results');
};