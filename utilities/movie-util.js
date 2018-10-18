const request = require('request');

const getMovie = () => {
  request('', (err, res, body) => {
    console.log('bodies:', body); 
  });
};
  
const callOMDBApi = (callback) => {
  callback();
};

module.exports = {
    getMovie,
    callOMDBApi
};