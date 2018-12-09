/* 
    Unit Tests for movie-util functions
 */
'use strict';

const app = require('../app.js'); 
const chai = require('chai');
const expect = require('chai').expect;
const assert = require('chai').assert;
chai.use(require('chai-http'));
const movieUtil = require('../utilities/movie-util');

describe('makeAPIRequest function', () => {
  it('should return a Promise', () => {
    const apiString = process.env.MY_API_KEY;
    assert.typeOf(movieUtil.makeAPIRequest(apiString), 'Promise');
  });
});

describe('getMonth function', () => {
  it('should return a string', () => {
    assert.typeOf(movieUtil.getMonth('Jan'), 'string');
  });
});

describe('calcDate function', () => {
  it('should return an object', () => {
    assert.typeOf(movieUtil.calcDate(), 'object');
  });
});

describe('calcPrvWkDate function', () => {
  it('should return an object', () => {
    assert.typeOf(movieUtil.calcPrevWkDate({'year': '2018', 'month':'11', 'day': '01' }), 'object');
  });
});

describe('calcDatePeriod function', () => {
  it('should return a string', () => {
    assert.typeOf(movieUtil.calcDatePeriod(), 'string');
  });
});

describe('validateMoviesInTheaterData function', () => {
  const movieInTheater = {
    results: [
    { 
      vote_count: 0,
      id: 511619,
      video: false,
      vote_average: 0,
      title: 'Test',
      popularity: 23.085,
      poster_path: '/bnh7yx2cqY2WOsSLkCKjffICkBS.jpg',
      original_language: 'uk',
      original_title: 'en',
      genre_ids: [ 36, 10752, 18 ],
      backdrop_path: null,
      adult: false,
      overview: 'Description Test',
      release_date: '2018-12-06' 
    }
  ]
  };
  it('should return an array', () => {
    assert.typeOf(
      movieUtil.
        validateMoviesInTheaterData(movieInTheater), 'array');
  });
});