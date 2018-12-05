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