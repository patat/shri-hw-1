/* global describe it beforeEach */
const expect = require('chai').expect;
const utils = require('../utils.js');
const formatTime = utils.formatTime;
const validateTypes = utils.validateTypes;
const validatePagination = utils.validatePagination;

describe('utils', function () {
  describe('formatTime', function () {
    it('formats time in ms as `hh:mm:ss`', function test () {
      expect(formatTime(0)).to.equal('00:00:00');
      expect(formatTime(5000)).to.equal('00:00:05');
      expect(formatTime(32949999)).to.equal('09:09:09');
    });

    it('allows more than 99 hours', function () {
      expect(formatTime(887764482)).to.equal('246:36:04');
    });
  });

  describe('validateTypes', function () {
    let allowedTypes;
    beforeEach(function () {
      allowedTypes = [
        'info',
        'critical'
      ];
    });

    it('returns true if no types are given', function test () {
      expect(validateTypes([], allowedTypes)).to.equal(true);
    });

    it('returns true if given types are allowed', function test () {
      expect(validateTypes(['info'], allowedTypes)).to.equal(true);
      expect(validateTypes(['critical'], allowedTypes)).to.equal(true);
      expect(validateTypes(['critical', 'info'], allowedTypes)).to.equal(true);
    });

    it('returns false if given types are not allowed', function test () {
      expect(validateTypes(['error'], allowedTypes)).to.equal(false);
      expect(validateTypes(['critical', 'error'], allowedTypes)).to.equal(false);
      expect(validateTypes(['critical', 'info', ''], allowedTypes)).to.equal(false);
    });
  });

  describe('validatePagination', function () {
    it('returns true if params are positive integers', function test () {
      expect(validatePagination(1, 99999)).to.equal(true);
    });

    it('returns false if one or both of params isn\'t a positive int', function test () {
      expect(validatePagination(0, 99999)).to.equal(false);
      expect(validatePagination(1, -99999)).to.equal(false);
      expect(validatePagination(1, '')).to.equal(false);
      expect(validatePagination(1, [])).to.equal(false);
      expect(validatePagination(-1, {})).to.equal(false);
    });
  });
});
