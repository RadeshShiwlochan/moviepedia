const request = require('request');

const getMovie = () => {
  const movieData = request('', (err, res, body) => {
    console.log('bodies:', body);
  });
  return movieData;
};
  
const callOMDBApi = (callback) => {
  return callback();
};

module.exports = {
    getMovie,
    callOMDBApi
};