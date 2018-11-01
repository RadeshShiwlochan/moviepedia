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
  res.render('../views/movie', callOMDBApi(getMoviesInTheaters));
};

exports.movieResults = (req,res) => {
  res.render('../views/movie-results');
};