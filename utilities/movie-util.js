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

const dateAsAString = (fullDate) => (fullDate).toString();

const currentDate = (dateString) => dateString.substring(4,15);

const getDay = (currentDate) => currentDate.substring(4,6);

const calcDate = () => {
  const fullDate = new Date();
  const dateStr = (fullDate).toString();
  const currntDate = dateStr.substring(4,15);
  const day = currntDate.substring(4,6);
  const month = currntDate.substring(0,3);
  const year = currntDate.substring(7);
  const todaysDate = month + '-' + day + '-' + year;
  return {
    'currentDate': todaysDate,
    'day': day,
    'month': month,
    'year': year
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
  return { 'year': year.toString(), 'month': month.toString(), 'day': day.toString() };
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

const makeAPIRequest = (apiEndPoint) => {
  return new Promise((resolve,reject) => {
    request(apiEndPoint, (err, res, body) => {
      if (!err) {
        resolve(body);
      } else {
        reject(err)
      }
    });
  });  
}

const validateMoviesInTheaterData = (moviesInTheaters) => {
  let validatedMovies = [];
  for (let i = 0; i < moviesInTheaters.length; ++i) {
    let movieData = moviesInTheaters[i];
    if (!movieData.hasOwnProperty('original_language') ||
        movieData['original_language'] != "en" || 
        movieData['poster_path'] === null) {
        continue; 
      } 
      validatedMovies.push(movieData);
  }//for
  return validatedMovies; 
};

const getMoviesInTheaters = () => {
  const dateRange = calcDatePeriod();
  const apiEndPointString = 
  'https://api.themoviedb.org/3/discover/movie?api_key=' + process.env.TMDb_API_KEY+ '&' + dateRange;
  return makeAPIRequest(apiEndPointString);
};

const getSearchResults = new Promise((resolve,reject) => {
  const apiEndPointString = 
  'http://www.omdbapi.com/?s=avengers&' + process.env.OMDB_API_KEY;
  return makeAPIRequest(apiEndPointString);
});

const insertPlusSignsBetweenString = (movieTitle) => {
  return movieTitle.split(" ").join('+');
}

const findMovieClickedObj = (req) => {
  const movieTitle = req.params.title;
  const movieYear = req.params.year; 
  return {"movieTitle": movieTitle, "movieYear": movieYear};
};

const getMovieResults = (movieSearchItem) => {
  const apiEndPointString = 
  'http://www.omdbapi.com/?s='+movieSearchItem+'&'+process.env.OMDB_API_KEY;
  return makeAPIRequest(apiEndPointString);
};

const searchMovieClicked = (movieClicked) => {
  const formattedTitle = insertPlusSignsBetweenString(movieClicked.movieTitle);
  const year = movieClicked.movieYear.substring(0,4);
  console.log("this is the movie that was clicked in function 2", movieClicked.title);
  const apiEndPointString = 
  'http://www.omdbapi.com/?t='+formattedTitle+'&y='+year+'&'+process.env.OMDB_API_KEY;
  return makeAPIRequest(apiEndPointString);
};

module.exports = {
  getMonth,
  calcDate,
  calcPrevWkDate,
  calcDatePeriod,
  getMoviesInTheaters,
  insertPlusSignsBetweenString,
  findMovieClickedObj,
  getMovieResults,
  searchMovieClicked,
  makeAPIRequest,
  validateMoviesInTheaterData
};
