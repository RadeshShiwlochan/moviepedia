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

module.exports = {
    getMovie,
    callOMDBApi
};