'use strict';

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
  }).catch((err) => {
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
  getSearchResults.then((value) => {
    const searchResults = JSON.parse(value);
    res.render('../views/movie-results', searchResults);
  }).catch((err) => {
    res.render('../views/home');
  });
};

exports.movie = (req, res) => {
  getMoviesInTheaters.then((movieResults) => {
    const movieResultsObject = JSON.parse(movieResults);
    const movieTitle = req.params.title;
    const movieID = req.params.id; 
    let movieClicked = {};
    for (let i = 0; i < movieResultsObject.results.length; i++) {
      if (movieResultsObject.results[i]["id"] == movieID) {
        movieClicked = movieResultsObject.results[i];
        break;
      }
    }
    return movieClicked;
  }).then((movieClicked) => {
    res.render('../views/movie', movieClicked);
  }).catch((error) => {
    console.log(error);
    reject(error);
  });
};