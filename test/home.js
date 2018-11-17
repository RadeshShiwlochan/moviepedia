/* 
    Unit Tests for homepage
 */
'use strict';

const app = require('../app.js'); 
const chai = require('chai');
const expect = require('chai').expect;
const assert = require('chai').assert;
chai.use(require('chai-http'));
const movieUtil = require('../utilities/movie-util');
const callOMDBApi = movieUtil.callOMDBApi;
const getMovie = movieUtil.getMovie;

describe('API endpoint /home', () => {
  it('should render the homepage', () => {
    return chai.request(app)
      .get('/home')
      .then((res) => {
        expect(res).to.have.status(200);
      });
  });
  it('should GET an object from API call to OMDB', () => {
    return chai.request(app)
      .get('/home')
      .then((res) => {
        expect(res).to.have.status(200);
        assert.typeOf(callOMDBApi(getMovie), 'object');
      });
  });
});