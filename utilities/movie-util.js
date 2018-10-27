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
  const movieData = request(``, (err, res, body) => {
    console.log('data', body);  
  });
};

module.exports = {
    getMovie,
    callOMDBApi
};