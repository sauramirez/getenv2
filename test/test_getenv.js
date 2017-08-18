'use strict';

const Joi = require('joi');

// set node_env before importing getenv
process.env.NODE_ENV = 'dev';
process.env.TEST_STRING = '11';
process.env.TEST_INTEGER = '11';
process.env.TEST_ARRAY = '1,11,111';
process.env.TEST_OBJECT = '{"test": true}';
process.env.TEST_BOOL = 'false';
process.env.TEST_BOOL_TRUE = 'true';

const Code = require('code');
const Lab = require('lab');
const Getenv = require('../lib/index');

const lab = exports.lab = Lab.script();
const expect = Code.expect;
const describe = lab.describe;
const it = lab.it;


describe('Getenv', function () {

  it('should return the default', function (done) {

    expect(Getenv('TEST_ENV', Joi.number().default(1))).to.equal(1);
    done();
  });

  it('should return boolean from the environment', function (done) {

    expect(Getenv('TEST_BOOL_TRUE', Joi.boolean())).to.be.true();
    done();
  });

  it('should return undefined', function (done) {

    expect(Getenv('TEST_ENV', Joi.number())).to.be.undefined();
    done();
  });

  it('should return the default even with no validation', function (done) {

    expect(Getenv('TEST_ENV', Joi, 'test')).to.equal('test');
    done();
  });

  it('should return undefined', function (done) {

    expect(Getenv('TEST_ENV', Joi)).to.be.undefined();
    done();
  });

  it('should use the default with no validation', function (done) {

    expect(Getenv('TEST_ENV', 'hi')).to.equal('hi');
    done();
  });

  it('should use the default fallback with no validation', function (done) {

    expect(Getenv('TEST_ENV', { dev: 'hi2' })).to.equal('hi2');
    done();
  });

  it('should throw if no validation and no default', function (done) {

    const throws = () => {

      Getenv('TEST_ENV');
    };
    expect(throws).to.throw(Error, 'No default specified');
    done();
  });

  it('should parse array from environment', function (done) {

    expect(Getenv('TEST_ARRAY', Getenv.joi.envarray().items(Joi.number()))).to.equal([1,11,111]);
    done();
  });

  it('should default on envarray', function (done) {

    expect(Getenv('TEST_ENV', Getenv.joi.envarray().default([1,12]))).to.equal([1,12]);
    done();
  });

  it('should parse object from environment', function (done) {

    expect(Getenv('TEST_OBJECT', Getenv.joi.envobject()).test).to.be.true();
    done();
  });

  it('should use default on envobject', function (done) {

    expect(Getenv('TEST_ENV', Getenv.joi.envobject().default({ testDefault: true})).testDefault).to.be.true();
    done();
  });

  it('should use the fallback', function (done) {

    Getenv.setObjectFallback('prod')
    expect(Getenv('TEST_ENV', Joi.number(), {
      prod: 4
    })).to.equal(4);
    done();
  });
});
