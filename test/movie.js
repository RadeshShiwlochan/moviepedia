/* Unit Tests for movie page */
'use strict';

const app = require('../app.js'); 
const chai = require('chai');
const expect = require('chai').expect;
const assert = require('chai').assert;
chai.use(require('chai-http'));
const movieUtil = require('../utilities/movie-util');
const callOMDBApi = movieUtil.callOMDBApi;
const getMovie = movieUtil.getMovie;

describe('API endpoint /movie', () => {
  it('should render the movie page', () => {
    return chai.request(app)
      .get('/movie')
      .then((res) => {
        expect(res).to.have.status(200);
      });
  });
});