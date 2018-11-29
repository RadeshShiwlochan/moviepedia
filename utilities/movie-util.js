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

const calcPrevWkDate = (currentDate) => {
  let year = parseInt(currentDate.year);
  let month = parseInt(currentDate.month);
  let day = parseInt(currentDate.day);

  if (day <= 7 && month != 1) {
    day = Math.abs(day - 30);
    month = month - 1;
  } else if( day <= 7 && month === 1) {
    month = 11;
    day = Math.abs(day - 30); 
    year = year - 1; 
  } else {
    day = day - 7;
  }
  return { 
           'year': year.toString(), 
           'month': month.toString(), 
           'day': day.toString() 
         };
}

const calcDatePeriod = () => {
  const currentDate = calcDate();
  const month = getMonth(currentDate.month);
  const prevWkDate =
    calcPrevWkDate({'year': currentDate.year, 'month':month, 'day': currentDate.day });
  const startPeriod = `${prevWkDate.year}-${prevWkDate.month}-${prevWkDate.day}`;
  const endPeriod = `${currentDate.year}-${month}-${currentDate.day}`;
  return `primary_release_date.gte=${startPeriod}&primary_release_date.lte=${endPeriod}`;
};

const getMovie = () => {
  const movieData = request(process.env.MY_API_KEY, (err, res, body) => {
    return new Promise((resolve,reject) => {
      if (!err) {
        resolve(body)
      } else {
        reject(err)
      }
    });
  });
  return movieData;
};
  
const getPopMovies = () => {
  const movieData = request(`https://api.themoviedb.org/3/movie/550?api_key=${process.env.TMDb_API_KEY}`, 
    (err, res, body) => {
  });
};

const getMoviesInTheaters = new Promise((resolve,reject) => {
  const dateRange = calcDatePeriod();
  request(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDb_API_KEY}&${dateRange}`,
  (err, res, body) => {
      if (!err) {
        resolve(body);
      } else {
        reject(err)
      }
  });
});

const getSearchResults = new Promise((resolve,reject) => {
  request(`http://www.omdbapi.com/?s=avengers&${process.env.OMDB_API_KEY}`, (err, res, body) => {
    if (!err) {
      resolve(body);
    } else {
      reject(err)
    }
  });
});

const callOMDBApi = (callback) => {
  return callback();
};

const insertPlusSignsBetweenString = (movieTitle) => {
  return movieTitle.split(" ").join('+');
}

const findMovieClickedObj = (movieResults, req) => {
  const movieResultsObject = JSON.parse(movieResults);
  const movieTitle = req.params.title;
  const movieID = req.params.id; 
  let movieClicked = {};
  for (let i = 0; i < movieResultsObject.results.length; i++) {
    if (movieResultsObject.results[i]["id"] == movieID) {
      movieClicked = movieResultsObject.results[i];
      break;
    }
  }
  return movieClicked;
};

module.exports = {
  getMonth,
  calcDate,
  calcPrevWkDate,
  calcDatePeriod,
  getMovie,
  getPopMovies,
  getMoviesInTheaters,
  callOMDBApi,
  insertPlusSignsBetweenString,
  findMovieClickedObj
};
