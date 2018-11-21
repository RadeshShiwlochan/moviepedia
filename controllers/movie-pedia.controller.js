const request = require('request');
const movieUtil = require('../utilities/movie-util');
const callOMDBApi = movieUtil.callOMDBApi;
const getMovie = movieUtil.getMovie;
const getPopMovies = movieUtil.getPopMovies;
const getMoviesInTheaters = movieUtil.getMoviesInTheaters;

exports.home = (req, res) => {
  getMoviesInTheaters.then((value) => {
    const moviesInTheaters = JSON.parse(value);
    res.render('../views/home', moviesInTheaters);
  }).catch(function(err) {
    res.render('../views/error');
  });
};

exports.movieResults = (req, res) => {
  const getSearchResults = new Promise((resolve,reject) => {
    request(`http://www.omdbapi.com/?s=${req.body.searchItem}&${process.env.OMDB_API_KEY}`, 
    (err, res, body) => {
      if (!err) {
        resolve(body);
      } else {
        reject(err)
      }
    });
  });
  getSearchResults.then(function(value) {
    const searchResults = JSON.parse(value);
    res.render('../views/movie-results', searchResults);
  }).catch(function(err) {
    res.render('../views/home');
  });
};

exports.movie = (req, res) => {
  const obj = req.params.title;
  const id = req.params.id;
  res.render('../views/movie', {'title':obj, 'id': id });
};