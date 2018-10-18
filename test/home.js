/* 
    Unit Tests for homepage
 */
'use strict';

const app = require('../app.js'); 
const chai = require('chai');
const expect = require('chai').expect;
chai.use(require('chai-http'));

describe('API endpoint /home', () => {
  it('should render the homepage', () => {
    return chai.request(app)
      .get('/home')
      .then((res) => {
        expect(res).to.have.status(200);
        console.log(res);
      });
  });
});