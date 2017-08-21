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

const Code = require('code');
const Lab = require('lab');
const Getenv = require('../lib/index');
const Errors = require('../lib/errors');

const lab = exports.lab = Lab.script();
const expect = Code.expect;
const describe = lab.describe;
const it = lab.it;


describe('Getenv', () => {

    it('should return the default', (done) => {

        expect(Getenv('TEST_ENV', Joi.number().default(1))).to.equal(1);
        done();
    });

    it('should return boolean from the environment', (done) => {

        expect(Getenv('TEST_BOOL_TRUE', Joi.boolean())).to.be.true();
        done();
    });


    it('should return the default even with no validation', (done) => {

        expect(Getenv('TEST_ENV', Joi, 'test')).to.equal('test');
        done();
    });

    it('should throw if no value undefined', (done) => {

        const throws = () => {

            Getenv('TEST_ENV', Joi);
        };
        expect(throws).to.throw(Errors.NoDefaultError, 'No default specified');
        done();
    });

    it('should use the default with no validation', (done) => {

        expect(Getenv('TEST_ENV', 'hi')).to.equal('hi');
        done();
    });

    it('should use the default fallback with no validation', (done) => {

        expect(Getenv('TEST_ENV', { dev: 'hi2' })).to.equal('hi2');
        done();
    });


    it('should throw if no validation and no default', (done) => {

        const throws = () => {

            Getenv('TEST_ENV');
        };
        expect(throws).to.throw(Errors.NoDefaultError, 'No default specified');
        done();
    });

    it('should parse array from environment', (done) => {

        expect(Getenv('TEST_ARRAY', Getenv.joi.envarray().items(Joi.number()))).to.equal([1,11,111]);
        done();
    });

    it('should default on envarray', (done) => {

        expect(Getenv('TEST_ENV', Getenv.joi.envarray().default([1,12]))).to.equal([1,12]);
        done();
    });

    it('should parse object from environment', (done) => {

        expect(Getenv('TEST_OBJECT', Getenv.joi.envobject()).test).to.be.true();
        done();
    });

    it('should use default on envobject', (done) => {

        expect(Getenv('TEST_ENV', Getenv.joi.envobject().default({ testDefault: true })).testDefault).to.be.true();
        done();
    });

    it('should use the fallback', (done) => {

        Getenv.setObjectFallback('prod');
        expect(Getenv('TEST_ENV', Joi.number(), {
            prod: 4
        })).to.equal(4);
        done();
    });

    it('should fail if no fallback', (done) => {

        Getenv.setObjectFallback('prod');
        const throws = () => {

            const env = Getenv('TEST_ENV', Joi.number(), {
                staging: 4
            });
            console.log('Enf', env);
        };
        expect(throws).to.throw(Errors.NoDefaultError, 'No default specified');
        done();
    });

    it('should test validation', (done) => {

        const throws = () => {

            Getenv('TEST_STRING', Joi.number());
        };
        expect(throws).to.throw(Error, { name: 'ValidationError' });
        done();
    });
});
