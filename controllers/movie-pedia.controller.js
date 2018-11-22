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
  // const movieTitle = req.params.title.trim();
  // const movieID = req.params.id;
  // console.log(movieTitle);
  // console.log(typeof movieTitle);
  const movieClicked = new Promise((resolve,reject) => {
    request("", (err, res, body) => {
      if (!err) {
        resolve(body);
      } else {
        reject(err)
      }
    });
  });
  movieClicked.then((value) => {
    const movieResults = JSON.parse(value);
    let movieObj = {};
    for (let i = 0; i < movieResults.Results.length;++i) {
      if (movieResults.Results[i]["id"] === movieID) {
        movieObj = movieResults.Results[i];
      }
    }
    console.log('this is movieObj', movieObj);
    res.render('../views/movie', {'title':obj, 'id': id });
  }).catch((err) => {
    console.log('ERROR OCCURRED!!!');
    res.render('../views/error');
  });
};