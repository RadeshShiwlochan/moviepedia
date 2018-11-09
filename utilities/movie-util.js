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

const calcDate = () => {
  const fullDate = new Date();
  const dateStr = (fullDate).toString();
  const currntDate = dateStr.substring(4,15);
  return {
    'currentDate': currntDate.substring(0,3),
    'day': currntDate.substring(4,6),
    'month': currntDate.substring(0,3),
    'year': currntDate.substring(7)
  };
}

const calcDatePeriod = () => {
  const currentDate = calcDate();
  const month = getMonth(currentDate.month);
  const startPeriod = `${year}-${month}-${previousWk}`;
  const endPeriod = `${year}-${month}-${day}`;
  /* add a function to fix this 
  let previousWk = (parseInt(day) - 7).toString();
  return `primary_release_date.gte=${startPeriod}&primary_release_date.lte=${endPeriod}`;
  */
};

const getMovie = () => {
  const movieData = request(process.env.MY_API_KEY, (err, res, body) => {
    return new Promise((resolve,reject) => {
      if (err != null) {
        resolve(body)
      } else {
        reject(err)
      }
    });
  });
  return movieData;
};
  
const callOMDBApi = (callback) => {
  return callback();
};

const getPopMovies = () => {
  const movieData = request(`https://api.themoviedb.org/3/movie/550?api_key=${process.env.TMDb_API_KEY}`, 
    (err, res, body) => {
  });
};

const getMoviesInTheaters = new Promise((resolve,reject) => {
  request(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDb_API_KEY}&primary_release_date.gte=2018-04-20&primary_release_date.lte=2018-05-05`,
  (err, res, body) => {
      if (!err) {
        resolve(body);
      } else {
        reject(err)
      }
  });
});

const getSearchResults = new Promise((resolve,reject) => {
  request(`http://www.omdbapi.com/?s=avengers&apikey=be60821a`, (err, res, body) => {
      if (!err) {
        resolve(body);
      } else {
        reject(err)
      }
  });
});

module.exports = {
  getMovie,
  callOMDBApi,
  getPopMovies,
  getMoviesInTheaters
};
