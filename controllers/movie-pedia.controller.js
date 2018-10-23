const request = require('request');
const movieUtil = require('../utilities/movie-util');
const callOMDBApi = movieUtil.callOMDBApi;
const getMovie = movieUtil.getMovie;

exports.home = (req, res) => {
  callOMDBApi(getMovie);
  res.render('../views/home');
};

exports.movie = (req, res) => {
  res.render('../views/movie');
};