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
    return movieUtil.findMovieClickedObj(movieResults, req);
  }).then((movieClicked) => {
    const movieData = new Promise( (resolve, reject ) => {
      const movieTitle = movieClicked.title;
      const formattedTitle = movieUtil.insertPlusSignsBetweenString(movieTitle);
      request(`http://www.omdbapi.com/?t=${formattedTitle}&${process.env.OMDB_API_KEY}`, 
      (err, res, body) => {
        if (!err) {
          resolve(body);
        } else {
          reject(err);
        }
      });
    });
    movieData.then((value) => {
      const movieDataObject = JSON.parse(value);
      console.log(movieDataObject);
      res.render('../views/movie', movieDataObject);
    }); 
  }).catch((error) => {
    console.log(error);
    reject(error);
  });
};  