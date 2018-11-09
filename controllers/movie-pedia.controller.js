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

exports.movieResults = (req, res) => {
  const getSearchResults = new Promise((resolve,reject) => {
    request(`http://www.omdbapi.com/?s=${req.body.searchItem}&`, (err, res, body) => {
      if (!err) {
        resolve(body);
      } else {
        reject(err)
      }
    });
  });
  getSearchResults.then(function(value) {
    const searchResults = JSON.parse(value);
    console.log(searchResults.Search[0]["Title"]);
    res.render('../views/movie-results', searchResults);
  }).catch(function(err) {
    res.render('../views/home');
  });
};

exports.movie = (req, res) => {
  res.render('../views/home');
};