'use strict';

const Joi = require('joi');

// set node_env before importing getenv
process.env.NODE_ENV = 'dev';
process.env.TEST_STRING = 'environment';
process.env.TEST_INTEGER = '11';
process.env.TEST_ARRAY = '1,11,111';
process.env.TEST_OBJECT = '{"test": true}';
process.env.TEST_BOOL = 'false';
process.env.TEST_BOOL_TRUE = 'true';

const Code = require('@hapi/code');
const Lab = require('@hapi/lab');
const Getenv = require('../lib/index');
const Errors = require('../lib/errors');

const lab = exports.lab = Lab.script();
const expect = Code.expect;
const describe = lab.describe;
const it = lab.it;


describe('Getenv', () => {

  it('should return the default', () => {

    expect(Getenv('TEST_ENV', Joi.number().default(1))).to.equal(1);
  });

  it('should return boolean from the environment', () => {

    expect(Getenv('TEST_BOOL_TRUE', Joi.boolean())).to.be.true();
  });


  it('should return the default even with no validation', () => {

    expect(Getenv('TEST_ENV', Joi.any(), 'test')).to.equal('test');
  });

  it('should throw if no value undefined', () => {

    const throws = () => {

      Getenv('TEST_ENV', Joi);
    };

    expect(throws).to.throw(Errors.NoDefaultError, 'No default specified');
  });

  it('should use the default with no validation', () => {

    expect(Getenv('TEST_ENV', 'hi')).to.equal('hi');
  });

  it('should use the default fallback with no validation', () => {

    expect(Getenv('TEST_ENV', { dev: 'hi2' })).to.equal('hi2');
  });

  it('should throw if no validation and no default', () => {

    const throws = () => {

      Getenv('TEST_ENV');
    };

    expect(throws).to.throw(Errors.NoDefaultError, 'No default specified');
  });

  it('should parse array from environment', () => {

    expect(Getenv('TEST_ARRAY', Getenv.joi.envarray().items(Joi.number()))).to.equal([1,11,111]);
  });

  it('should default on envarray', () => {

    expect(Getenv('TEST_ENV', Getenv.joi.envarray().default([1,12]))).to.equal([1,12]);
  });

  it('should parse object from environment', () => {

    expect(Getenv('TEST_OBJECT', Getenv.joi.envobject()).test).to.be.true();
  });

  it('should use default on envobject', () => {

    expect(Getenv('TEST_ENV', Getenv.joi.envobject().default({ testDefault: true })).testDefault).to.be.true();
  });

  it('should use the fallback', () => {

    Getenv.setObjectFallback('prod');
    expect(Getenv('TEST_ENV', Joi.number(), {
      prod: 4
    })).to.equal(4);
  });

  it('should fail if no fallback', () => {

    Getenv.setObjectFallback('prod');
    const throws = () => {

      Getenv('TEST_ENV', Joi.number(), {
        staging: 4
      });
    };

    expect(throws).to.throw(Errors.NoDefaultError, 'No default specified');
  });

  it('should test validation', () => {

    const throws = () => {

      Getenv('TEST_STRING', Joi.number());
    };

    expect(throws).to.throw(Error, { name: 'ValidationError' });
  });
});
