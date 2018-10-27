const request = require('request');
const movieUtil = require('../utilities/movie-util');
const callOMDBApi = movieUtil.callOMDBApi;
const getMovie = movieUtil.getMovie;
const getPopMovies = movieUtil.getPopMovies;

exports.home = (req, res) => {
  callOMDBApi(getPopMovies);
  res.render('../views/home');
};

exports.movie = (req, res) => {
  res.render('../views/movie');
};