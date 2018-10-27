const request = require('request');

const getMovie = () => {
  const movieData = request(process.env.MY_API_KEY, (err, res, body) => {
    console.log('bodies:', body);
  });
  return movieData;
};
  
const callOMDBApi = (callback) => {
  return callback();
};

const getPopMovies = () => {
  const movieData = request(`https://api.themoviedb.org/3/movie/550?api_key=${process.env.TMDb_API_KEY}`, 
    (err, res, body) => {
    console.log('data', body);  
  });
};

const getMoviesInTheaters = () => {
  const moviesData = request(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDb_API_KEY}&primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22`,
  (err, res, body) => {
    console.log('movies', body);
  });
}

module.exports = {
    getMovie,
    callOMDBApi,
    getPopMovies,
    getMoviesInTheaters
};