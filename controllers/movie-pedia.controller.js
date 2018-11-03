const request = require('request');
const movieUtil = require('../utilities/movie-util');
const callOMDBApi = movieUtil.callOMDBApi;
const getMovie = movieUtil.getMovie;
const getPopMovies = movieUtil.getPopMovies;
const getMoviesInTheaters = movieUtil.getMoviesInTheaters;

exports.home = (req, res) => {
  res.render('../views/home');
};

exports.movie = (req, res) => {
  getMoviesInTheaters.then(function(value) {
    res.render('../views/movie', value);
  }).catch(function(err) {
    res.render('../views/home')
  });
};

exports.movieResults = (req,res) => {
  res.render('../views/movie-results');
};