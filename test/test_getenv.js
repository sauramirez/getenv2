'use strict';

// set node_env before importing getenv
process.env.NODE_ENV = 'dev';
process.env.TEST_STRING = '11';
process.env.TEST_INTEGER = '11';
process.env.TEST_ARRAY = '1,11,111';
process.env.TEST_BOOL = 'false';
process.env.TEST_BOOL_TRUE = 'true';
process.env.TEST_BOOL_EMPTY = '';

const Code = require('code');
const Lab = require('lab');
const Getenv = require('../lib/index');

const lab = exports.lab = Lab.script();
const expect = Code.expect;
const describe = lab.describe;
const it = lab.it;


describe('Getenv', function () {
  it('should return the fallback', function (done) {
    expect(Getenv('TEST_ENV', 1)).to.equal(1);
    done();
  });

  it('should throw when no fallback is provided', function (done) {
    const noFallback = () => {
      Getenv('TEST_ENV');
    };
    expect(noFallback).to.throw('Error', /Getenv FallbackError/);
    done();
  });

  it('should convert env to a string', function (done) {
    expect(Getenv('TEST_STRING', undefined, 'string')).to.equal('11');
    done();
  });

  it('should convert env to an integer', function (done) {
    expect(Getenv('TEST_INTEGER', undefined, 'int')).to.equal(11);
    done();
  });

  it('should convert env to a boolean', function (done) {
    expect(Getenv('TEST_BOOL', undefined, 'bool')).to.be.false();
    done();
  });

  it('should convert an empty env to a false boolean', function (done) {
    expect(Getenv('TEST_BOOL_EMPTY', undefined, 'bool')).to.be.false();
    done();
  });

  it('should convert truen env to a boolean', function (done) {
    expect(Getenv('TEST_BOOL_TRUE', undefined, 'bool')).to.be.true();
    done();
  });

  it('should convert env to an array', function (done) {
    expect(Getenv('TEST_ARRAY', undefined, 'array')).to.equal(['1', '11', '111']);
    done();
  });

  it('should use the object fallback', function (done) {
    expect(Getenv('TEST_OBJECT', {'dev': 11})).to.equal(11);
    done();
  });

  it('should throw if no object fallback', function (done) {
    const noFallback = () => {
      Getenv('TEST_OBJECT', {'prod': 11});
    };
    expect(noFallback).to.throw('Error', /Getenv FallbackError/);
    done();
  });

  it('should throw if no converter exists', function (done) {
    const noFallback = () => {
      // use a string object to test that flow
      Getenv('TEST_COERCE', undefined, new String('unknown'));
    };
    expect(noFallback).to.throw('Error', /Getenv CoercionError/);
    done();
  });

  it('should use the object fallback after setting it', function (done) {
    Getenv.setObjectFallback('newdev');
    expect(Getenv('TEST_OBJECT', {'newdev': 11})).to.equal(11);
    done();
  });
});
