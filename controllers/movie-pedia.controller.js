const request = require('request');

const getMovie = () => {
  request('', (error, response, body) => {
  console.log('error:', error); 
  console.log('statusCode:', response && response.statusCode); 
  console.log('body:', body); 
});
};

const callApi = (callback) => {
  callback();
};

exports.home = (req, res) => {
  res.render('../views/home');
};

exports.movie = (req, res) => {
  callApi(getMovie);
  res.render('../views/movie');
};