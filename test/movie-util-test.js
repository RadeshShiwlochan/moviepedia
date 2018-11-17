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

describe('getMonth function', () => {
  it('should return a string', () => {
        assert.typeOf(movieUtil.getMonth('Jan'), 'string');
  });
});