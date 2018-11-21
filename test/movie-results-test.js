/* Unit Tests for movie-util functions */
'use strict';

const app = require('../app.js'); 
const chai = require('chai');
const expect = require('chai').expect;
const assert = require('chai').assert;
chai.use(require('chai-http'));
const movieUtil = require('../utilities/movie-util');

describe('API endpoint /movie-search-results', () => {
    it('should render the movie results page', () => {
      return chai.request(app)
        .post('/movie-search-results')
        .then((res) => {
          expect(res).to.have.status(200);
        });
    });
  });