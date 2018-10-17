const request = require('request');

request('http://www.omdbapi.com/?i=tt3896198&apikey=be60821a', (error, response, body) => {
  console.log('error:', error); 
  console.log('statusCode:', response && response.statusCode); 
  console.log('body:', body); 
});