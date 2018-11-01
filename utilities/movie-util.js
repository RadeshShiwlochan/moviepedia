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
  const dat = new Date();
  const date = (dat).toString();
  let currntDate = date.substring(4,15);
  let month = currntDate.substring(0,3);
  let day = currntDate.substring(4,6);
  let year = currntDate.substring(7); 
  currMnthNum = getMonth(month);
  let previousWk = (parseInt(day) - 7).toString();
  let startPeriod = `${year}-${currMnthNum}-${previousWk}`;
  let endPeriod = `${year}-${currMnthNum}-${day}`;
  return `primary_release_date.gte=${startPeriod}&primary_release_date.lte=${endPeriod}`;
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
  const moviesData = request(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDb_API_KEY}&primary_release_date.gte=2018-04-20&primary_release_date.lte=2018-05-05`,
  (err, res, body) => {
    return body;
  });
  return moviesData;
};

module.exports = {
  getMovie,
  callOMDBApi,
  getPopMovies,
  getMoviesInTheaters
};

console.log(calcDatePeriod());