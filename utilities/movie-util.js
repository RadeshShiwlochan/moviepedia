const request = require('request');

const getMonth = (month) => {
  const fullYr = {
    'Jan': '01',
    'Feb': '02',
    'Mar': '03',
    'Apr': '04',
    'May': '05',
    'Jun': '06',
    'Jul': '07',
    'Aug': '08',
    'Sep': '09',
    'Oct': '10',
    'Nov': '11',
    'Dec': '12'
  }
  return fullYr[month];
}

const calcDatePeriod = () => {
  const date = new Date();
  let currntDate = date.substring(4,15);
  let month = currntDate.substring(0,3);
  let day = currntDate.substring(8,10);
  let year = currntDate.substring(11); 
};

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

console.log(getMonth('Oct'));